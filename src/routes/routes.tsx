import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home/Home"
import Recipes from "../pages/recipes/Recipes"
import AddRecipe from "../pages/recipes/AddRecipe"
import Payment from "../pages/payment/Payment"
import RecipeDetails from "../pages/recipes/RecipeDetails"
import BuyCoin from "../pages/payment/BuyCoin"
import PrivateRoute from "./PrivateRoute"
import PrivateRecipeDetails from "./PrivateRecipeDetails"
import Login from "../pages/Authentication/Login"
import Registration from "../pages/Authentication/Registration"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Registration />,
			},
			{
				path: "/recipes",
				element: <Recipes />,
			},
			{
				path: "/recipe-details/:id",
				element: (
					<PrivateRecipeDetails>
						<RecipeDetails />
					</PrivateRecipeDetails>
				),
			},
			{
				path: "/add-recipe",
				element: (
					<PrivateRoute>
						<AddRecipe />
					</PrivateRoute>
				),
			},
			{
				path: "/payment",
				element: <Payment />,
			},
			{
				path: "/buy-coin",
				element: <BuyCoin />,
			},
		],
	},
])

export default router
