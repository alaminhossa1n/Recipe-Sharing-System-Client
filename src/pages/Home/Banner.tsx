import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

const Banner = () => {
	return (
		<div className="bg-cover bg-center py-10 bg-secondary">
			<div className="container mx-auto grid grid-cols-2 gap-5">
				<div className="flex flex-col gap-2 justify-center">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
						Discover Delicious Recipes
					</h1>
					<p className="text-lg md:text-xl lg:text-2xl mb-8">
						Cook, Share, and Enjoy with Our Community
					</p>
					<div className="flex gap-2">
						<Button asChild variant="default">
							<Link to="/recipes">See Recipes</Link>
						</Button>
						<Button asChild variant="outline">
							<Link to="/add-recipe">
								<PlusIcon size={15} className="mr-2" /> Add Recipe
							</Link>
						</Button>
					</div>
				</div>

				<div>
					<img src="/banner.png" alt="banner" />
				</div>
			</div>
		</div>
	)
}

export default Banner
