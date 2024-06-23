import { useParams } from "react-router-dom";
import {
  useGetAllRecipeQuery,
  useGetSingleRecipeQuery,
} from "../../redux/features/recipe/recipeApi";
import RecipeCard from "../../components/RecipeCard";
import { TRecipe } from "../../interface/interface";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleRecipeQuery(id);
  const recipe = data?.data;
  const { data: allRecipeData } = useGetAllRecipeQuery({
    category: recipe?.category,
  });
  const recipes = allRecipeData?.data;

  // Create a sorted copy of the recipes array
  const sortedRecipes = recipes
    ? [...recipes].sort((a, b) => b.watchCount - a.watchCount).slice(0, 3)
    : [];


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8 p-6">
        <img
          className="w-full h-64 object-cover"
          src={recipe?.recipeImage}
          alt={recipe?.recipeName}
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {recipe?.recipeName}
          </h2>
          <p className="text-lg text-gray-800 mb-4">{recipe?.recipeDetails}</p>
          <div className="mb-4">
            <strong>Category:</strong>{" "}
            <span className="text-gray-700">{recipe?.category}</span>
          </div>
          <div className="mb-4">
            <strong>Country:</strong>{" "}
            <span className="text-gray-700">{recipe?.country}</span>
          </div>
          <div className="mb-4">
            <strong>Creator Email:</strong>{" "}
            <span className="text-gray-700">{recipe?.creatorEmail}</span>
          </div>
          {recipe?.video && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Recipe Video
              </h3>
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

      <div className="mt-10 p-10">
        <h3 className="text-xl text-center font-bold text-gray-900 mb-4">
          Suggested Recipes
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {recipes &&
            sortedRecipes.map((recipe: TRecipe, i: number) => (
              <RecipeCard recipe={recipe} key={i} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeDetails;
