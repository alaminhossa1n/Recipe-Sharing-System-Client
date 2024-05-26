import Swal from "sweetalert2";
import { TRecipe, TUser } from "../interface/interface";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface RecipeCardProps {
  recipe: TRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  console.log(currentUser);

  const navigate = useNavigate();

  const handleViewRecipe = (id) => {
    Swal.fire({
      title: "Do you want to spend 10 coin?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (currentUser.coin > 10) {
          navigate(`/recipe-details/${id}`);
        } else {
          navigate(`/buy-coin`);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    console.log(id);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={recipe.recipeImage}
        alt={recipe.recipeName}
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {recipe.recipeName}
        </h2>
        <p className="text-gray-700 mb-1">
          <strong>Purchased By:</strong> {recipe.purchased_by}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Creator Email:</strong> {recipe.creatorEmail}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Country:</strong> {recipe.country}
        </p>
        <div className="text-center mt-4">
          <button
            className="btn btn-neutral"
            onClick={() => handleViewRecipe(recipe._id)}
          >
            View The Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
