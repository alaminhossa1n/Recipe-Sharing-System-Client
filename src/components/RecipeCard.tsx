import type { TRecipe, TUser } from "../interface/interface"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { toast } from "sonner"
import { useGetSingleUserQuery } from "../redux/features/auth/authApi"
import {
	useReactRecipeMutation,
	useViewRecipeMutation,
} from "../redux/features/recipe/recipeApi"
import { useState } from "react"
import { Eye, Globe2, Mail, ThumbsUp } from "lucide-react"
import { Button } from "./ui/button"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface RecipeCardProps {
	recipe: TRecipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
	const [viewOpen, setViewOpen] = useState(false)
	const token: Partial<TUser | null> = useAppSelector(
		(state) => state.auth.user,
	)
	const [viewRecipe] = useViewRecipeMutation()
	const { data, refetch } = useGetSingleUserQuery({ email: token?.email })
	const [reactRecipe] = useReactRecipeMutation()
	const currentUser = data?.data

	const [isReact, setIsReact] = useState(
		recipe.reactors?.includes(currentUser?.email),
	)
	const navigate = useNavigate()

	const handleViewRecipe = async (recipe: TRecipe) => {
		if (!token) {
			toast.warning("To view recipe details, Please login First.")
			return
		}

		if (recipe.creatorEmail === currentUser?.email) {
			navigate(`/recipe-details/${recipe._id}`)
			await viewRecipe({
				id: recipe._id,
				recipeInfo: {},
			}).unwrap()

			return
		}

		const parchedUser = recipe.purchased_by
			? recipe.purchased_by.find((n) => n === currentUser?.email)
			: undefined

		if (parchedUser) {
			navigate(`/recipe-details/${recipe._id}`)
			await viewRecipe({
				id: recipe._id,
				recipeInfo: {},
			}).unwrap()
			return
		}

		setViewOpen(true)
	}

	const handleRecipePurchase = async () => {
		if (currentUser.coin >= 10) {
			const res = await viewRecipe({
				id: recipe._id,
				recipeInfo: {
					viewerEmail: currentUser.email,
					creatorEmail: recipe.creatorEmail,
				},
			}).unwrap()

			if (res.success === true) {
				toast.success("Now you have access of this recipe")
				navigate(`/recipe-details/${recipe._id}`)
				refetch()
			}
		} else {
			navigate(`/buy-coin`)
		}
	}

	const handleReactionClick = async () => {
		if (!currentUser) {
			toast.warning("You need to be logged in to react.")
			return
		}

		await reactRecipe({
			recipeId: recipe._id,
			viewerEmail: currentUser?.email,
			state: !isReact,
		})
		setIsReact(!isReact)
	}

	return (
		<div className="bg-secondary rounded-lg overflow-hidden">
			<img
				className="w-full aspect-video object-cover"
				src={recipe.recipeImage}
				alt={recipe.recipeName}
			/>
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-2">{recipe.recipeName}</h2>
				<p className="flex items-center gap-2">
					<Mail size={20} /> <span>{recipe.creatorEmail}</span>
				</p>
				<p className="flex items-center gap-2 mt-1">
					<Globe2 size={20} /> <span>{recipe.country}</span>
				</p>
				<div className="flex justify-between items-center mt-4">
					<Button variant="outline" onClick={() => handleViewRecipe(recipe)}>
						View The Recipe
					</Button>

					<AlertDialog open={viewOpen} onOpenChange={setViewOpen}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Buy Recipe</AlertDialogTitle>
								<AlertDialogDescription>
									You are about to spend 10 coins to view this recipe
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleRecipePurchase}>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<div className="flex items-center">
						<p className={`text-2xl text-blue-500`}>
							<Eye size={15} />
						</p>
						<span className="ml-2 ">{recipe?.watchCount}</span>
					</div>

					<div className="flex items-center">
						<p
							className={`cursor-pointer text-2xl ${
								recipe.reactors?.includes(currentUser?.email)
									? "text-blue-500"
									: ""
							}`}
							onClick={handleReactionClick}
						>
							<ThumbsUp size={15} />
						</p>
						<span className="ml-2 ">{recipe.reactors?.length}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecipeCard
