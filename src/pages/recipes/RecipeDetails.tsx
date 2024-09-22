import { useParams } from "react-router-dom"
import {
	useGetAllRecipeQuery,
	useGetSingleRecipeQuery,
} from "../../redux/features/recipe/recipeApi"
import RecipeCard from "../../components/RecipeCard"
import type { TRecipe } from "../../interface/interface"

const RecipeDetails = () => {
	const { id } = useParams()
	const { data, isLoading } = useGetSingleRecipeQuery(id)
	const recipe = data?.data
	const { data: allRecipeData } = useGetAllRecipeQuery({
		category: recipe?.category,
	})
	const recipes = allRecipeData?.data

	// Create a sorted copy of the recipes array
	const sortedRecipes = recipes
		? [...recipes].sort((a, b) => b.watchCount - a.watchCount).slice(0, 3)
		: []

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
			</div>
		)
	}

	return (
		<section>
			<div className="container px-5 mx-auto mt-20">
				<img
					className="w-full aspect-video object-cover rounded-md"
					src={recipe?.recipeImage}
					alt={recipe?.recipeName}
				/>
				<div className="mt-5">
					<h2 className="text-4xl font-bold capitalize">
						{recipe?.recipeName}
					</h2>
					<p className="text-muted-foreground">{recipe?.recipeDetails}</p>
					<div className="mt-5">
						<strong>Category:</strong>{" "}
						<span className="">{recipe?.category}</span>
					</div>
					<div className="mt-1">
						<strong>Country:</strong>{" "}
						<span className="">{recipe?.country}</span>
					</div>
					<div className="mt-1">
						<strong>Creator Email:</strong>{" "}
						<span className="">{recipe?.creatorEmail}</span>
					</div>

					{recipe?.video && (
						<div className="mt-5">
							<h3 className="text-2xl font-bold  mb-2">Recipe Video</h3>
							<iframe
								width="100%"
								height="400"
								src={recipe.video}
								title={recipe?.recipeName}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="rounded-lg"
							></iframe>
						</div>
					)}
				</div>
			</div>

			<div className="container mx-auto px-5 mt-10">
				<h3 className="text-2xl font-bold">Suggested Recipes</h3>
				<div className="grid grid-cols-3 gap-5 mt-2">
					{recipes &&
						sortedRecipes.map((recipe: TRecipe, i: number) => (
							<RecipeCard recipe={recipe} key={i} />
						))}
				</div>
			</div>
		</section>
	)
}

export default RecipeDetails
