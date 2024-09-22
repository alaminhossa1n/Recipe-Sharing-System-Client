import { type SubmitHandler, useForm } from "react-hook-form"
import { useAddRecipeMutation } from "../redux/features/recipe/recipeApi"
import type { TRecipe, TUser } from "../interface/interface"
import { toast } from "sonner"
import { useAppSelector } from "../redux/hooks"
import { useGetAllCategoriesQuery } from "../redux/features/category/categoryApi"
import { useGetAllCountriesQuery } from "../redux/features/country/countryApi"
import { Input } from "./ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { type ChangeEvent, useState } from "react"

const recipeSchema = z.object({
	recipeName: z.string(),
	category: z.string(),
	country: z.string(),
	recipeDetails: z.string(),
	video: z.string(),
})

const RecipeForm: React.FC = () => {
	const [image, setImage] = useState<File | null>(null)
	const form = useForm<z.infer<typeof recipeSchema>>({
		resolver: zodResolver(recipeSchema),
	})

	const [addRecipe] = useAddRecipeMutation()
	const { data: categoryData } = useGetAllCategoriesQuery(null)
	const { data: countryData } = useGetAllCountriesQuery(null)
	const currentUser: Partial<TUser> | null = useAppSelector(
		(state) => state.auth.user,
	)

	const categories = categoryData?.data
	const countries = countryData?.data

	const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0]
		if (file) {
			setImage(file)
		}
	}
	const onSubmit: SubmitHandler<TRecipe> = async (data: Partial<TRecipe>) => {
		data.creatorEmail = currentUser?.email

		const getVideoId = (url: string) => {
			try {
				const urlObj = new URL(url)
				const pathname = urlObj.pathname
				const videoId = pathname.split("/")[1]
				return videoId
			} catch (error) {
				console.error("Invalid URL:", error)
				return null
			}
		}
		const videoId = getVideoId(data.video as string)
		const embedUrl = `https://www.youtube.com/embed/${videoId}`

		const formData = new FormData()

		if (image) {
			formData.append("image", image)
		}

		// Append other required fields
		formData.append("recipeName", data.recipeName || "")
		formData.append("category", data.category || "")
		formData.append("country", data.country || "")
		formData.append("video", embedUrl || "")
		formData.append("recipeDetails", data.recipeDetails || "")
		formData.append("creatorEmail", data.creatorEmail || "")

		try {
			const res = await addRecipe(formData).unwrap()
			if (res.success === true) {
				toast.success("Product Added Successfully!")
				form.reset()
			}
		} catch (err) {
			toast.error("Failed to add product")
		}
	}

	return (
		<div className="max-w-lg mx-auto p-6 bg-secondary rounded-lg shadow-md mt-20">
			<h2 className="text-2xl font-bold text-center">Add a New Recipe</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
					<FormField
						control={form.control}
						name="recipeName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Recipe Name</FormLabel>
								<FormControl>
									<Input
										value={field.value}
										onChange={field.onChange}
										placeholder="Recipe Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories?.map((cat) => (
											<SelectItem
												key={cat.categoryName}
												value={cat.categoryName}
											>
												{cat.categoryName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Country</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Country" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{countries?.map((cat) => (
											<SelectItem key={cat.countryName} value={cat.countryName}>
												{cat.countryName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="mt-5">
						<Label>Recipe Image</Label>
						<Input
							className="mt-2"
							onChange={handleImageSelect}
							placeholder="Select File"
							type="file"
						/>
					</div>

					<FormField
						control={form.control}
						name="video"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Video URL</FormLabel>
								<FormControl>
									<Input
										value={field.value}
										onChange={field.onChange}
										placeholder="Video URL"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="recipeDetails"
						render={({ field }) => (
							<FormItem className="mt-5">
								<FormLabel>Recipe Details</FormLabel>
								<FormControl>
									<Textarea
										value={field.value}
										onChange={field.onChange}
										placeholder="Recipe Details"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="mt-5">
						<Button className="w-full">Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default RecipeForm
