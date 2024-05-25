import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Recipes from "../pages/recipes/Recipes";
import AddRecipe from "../pages/recipes/AddRecipe";

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
        path: "/add-recipe",
        element: <AddRecipe />,
      },
    ],
  },
]);

export default router;
