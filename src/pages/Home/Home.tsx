import { BookCheck, ChevronRight, Users, Utensils } from "lucide-react"
import Banner from "./Banner"
import CountUp from "react-countup"
import { useGetAllRecipeQuery } from "@/redux/features/recipe/recipeApi"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
	const { data } = useGetAllRecipeQuery({
		recipeName: "",
		category: "",
		country: "",
	})

	const recipes = data?.data || []

	return (
		<div>
			<Banner />
			<div className="bg-primary text-secondary">
				<div className="container mx-auto px-5 grid grid-cols-3 gap-5 py-10">
					<div className="">
						<Utensils size={40} />
						<p className="text-2xl font-bold mt-2">
							<CountUp start={0} end={1200} /> + Recipes
						</p>
						<p className="text-secondary-content">
							We've developed over 1200+ recipes. Follow for some more!
						</p>
					</div>

					<div>
						<Users size={40} />
						<p className="text-2xl font-bold mt-2">
							<CountUp start={0} end={300} /> + Users
						</p>
						<p>
							We host the best community where people can share their recipes
						</p>
					</div>

					<div>
						<BookCheck size={40} />
						<p className="text-2xl font-bold mt-2">Weekly Updates</p>
						<p>We post new recipes every week, stay tuned for updates!</p>
					</div>
				</div>
			</div>

			<div className="bg-secondary">
				<div className="container mx-auto px-5 py-10">
					<h2 className="text-center text-4xl font-bold">Featured Recipes</h2>

					<div className="grid grid-cols-3 gap-5 mt-10">
						{recipes.slice(0, 3).map((recipe) => (
							<div
								key={recipe._id}
								className="bg-zinc-900 rounded-lg overflow-hidden"
							>
								<img
									src={recipe.recipeImage}
									alt={recipe.recipeName}
									className="w-full aspect-video object-cover"
								/>

								<div className="p-5">
									<p className="text-2xl font-bold">{recipe.recipeName}</p>
									<p className="mt-5">
										<b>Creator</b>: {recipe.creatorEmail}
									</p>
									<p>
										<b>Country</b>: {recipe.country}
									</p>
								</div>
							</div>
						))}
					</div>

					<div className="flex items-center justify-center mt-5">
						<Button asChild>
							<Link to="/recipes">
								View All Recipe <ChevronRight size={15} className="ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
