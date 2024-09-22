import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<footer className="bg-secondary mt-20">
			<div className="container px-5 mx-auto py-10">
				<div className="flex items-center justify-center flex-col">
					<h3 className="text-4xl font-bold">Recipe Sharing</h3>
					<p className="text-muted-foreground">
						Easy healthy recipes that make you feel good
					</p>
				</div>

				<div className="flex items-center justify-center gap-2 mt-5">
					<FaFacebook />
					<FaInstagram />
					<FaTwitter />
					<FaPinterest />
				</div>

				<div className="py-5 border-t border-b border-zinc-700 mt-5">
					<ul className="flex items-center gap-10 justify-center">
						<li>
							<Link to="/recipes">All Recipes</Link>
						</li>
						<li>
							<Link to="/add-recipe">All Recipes</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
					</ul>
				</div>

				<p className="text-center text-muted-foreground mt-10">
					Copyright 2024 - Recipe Sharing, All Rights Reserved
				</p>
			</div>
		</footer>
	)
}

export default Footer
