import { useParams } from "react-router-dom";
import { useGetSingleRecipeQuery } from "../../redux/features/recipe/recipeApi";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleRecipeQuery(id);
  const recipe = data?.data;
  console.log(recipe);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8 p-6">
      <img
        className="w-full h-64 object-cover"
        src={recipe.recipeImage}
        alt={recipe.recipeName}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {recipe.recipeName}
        </h2>
        <p className="text-lg text-gray-800 mb-4">{recipe.recipeDetails}</p>
        <div className="mb-4">
          <strong>Category:</strong>{" "}
          <span className="text-gray-700">{recipe.category}</span>
        </div>
        <div className="mb-4">
          <strong>Country:</strong>{" "}
          <span className="text-gray-700">{recipe.country}</span>
        </div>
        <div className="mb-4">
          <strong>Creator Email:</strong>{" "}
          <span className="text-gray-700">{recipe.creatorEmail}</span>
        </div>
        {recipe.video && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Recipe Video
            </h3>
            <iframe
              width="100%"
              height="400"
              src={recipe.video}
              title={recipe.recipeName}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
