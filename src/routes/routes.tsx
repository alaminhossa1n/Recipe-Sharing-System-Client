import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Recipes from "../pages/recipes/Recipes";
import AddRecipe from "../pages/recipes/AddRecipe";
import Payment from "../pages/payment/Payment";
import RecipeDetails from "../pages/recipes/RecipeDetails";
import BuyCoin from "../pages/payment/BuyCoin";

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
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipe-details/:id",
        element: <RecipeDetails />,
      },
      {
        path: "/add-recipe",
        element: <AddRecipe />,
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
]);

export default router;
