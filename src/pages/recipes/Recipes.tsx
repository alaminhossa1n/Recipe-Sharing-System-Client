import { type ChangeEvent, useEffect, useState } from "react"
import RecipeCard from "../../components/RecipeCard"
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi"
import { useGetAllCountriesQuery } from "../../redux/features/country/countryApi"
import { useGetAllRecipeQuery } from "../../redux/features/recipe/recipeApi"
import type { TRecipe } from "../../interface/interface"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const Recipes: React.FC = () => {
	const { data: categoryData } = useGetAllCategoriesQuery(null)
	const { data: countryData } = useGetAllCountriesQuery(null)

	const categories = categoryData?.data || []
	const countries = countryData?.data || []

	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("")
	const [selectedCountry, setSelectedCountry] = useState("")

	const [filters, setFilters] = useState({
		recipeName: "",
		category: "",
		country: "",
	})

	// Fetch recipes with the filter values
	const { data, isLoading, isError } = useGetAllRecipeQuery(filters)

	const recipes = data?.data || []

	const handleSearchChange = (value: string) => {
		setSearchQuery(value)
	}

	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value)
	}

	const handleCountryChange = (value: string) => {
		setSelectedCountry(value)
	}

	// Update filters whenever searchQuery, selectedCategory, or selectedCountry change
	useEffect(() => {
		setFilters({
			recipeName: searchQuery,
			category: selectedCategory,
			country: selectedCountry,
		})
	}, [searchQuery, selectedCategory, selectedCountry])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
			</div>
		)
	}

	if (isError) {
		return <div>Error loading recipes.</div>
	}

	return (
		<div className="container mx-auto px-4 mt-28">
			<div>
				<Input
					onChange={(e) => handleSearchChange(e.target.value)}
					placeholder="Search by name"
				/>

				<div className="grid grid-cols-2 gap-5 mt-5">
					<Select onValueChange={(value) => handleCategoryChange(value)}>
						<SelectTrigger>
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							{categories?.map(
								(category: { categoryName: string }, index: number) => (
									<SelectItem key={index} value={category.categoryName}>
										{category.categoryName}
									</SelectItem>
								),
							)}
						</SelectContent>
					</Select>
					<Select onValueChange={(value) => handleCountryChange(value)}>
						<SelectTrigger>
							<SelectValue placeholder="Country" />
						</SelectTrigger>
						<SelectContent>
							{countries?.map(
								(country: { countryName: string }, index: number) => (
									<SelectItem key={index} value={country.countryName}>
										{country.countryName}
									</SelectItem>
								),
							)}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 mt-10">
				{recipes?.map((recipe: TRecipe, i: number) => (
					<RecipeCard key={i} recipe={recipe} />
				))}
			</div>
		</div>
	)
}

export default Recipes
