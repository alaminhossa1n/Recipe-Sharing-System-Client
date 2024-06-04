import Swal from "sweetalert2";
import { TRecipe } from "../interface/interface";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useGetSingleUserQuery,
  useUpdateCoinMutation,
} from "../redux/features/auth/authApi";
import { toast } from "sonner";

interface RecipeCardProps {
  recipe: TRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const token = useAppSelector((state) => state.auth.user);
  const [updateCoin] = useUpdateCoinMutation();
  const { data, refetch } = useGetSingleUserQuery({ email: token?.email });
  const currentUser = data?.data;

  const navigate = useNavigate();

  const handleViewRecipe = (recipe) => {
    console.log(recipe);
    if (!token) {
      toast.warning("To view recipe details, Please login First.");
      return;
    }
    if (recipe.creatorEmail === currentUser.email) {
      navigate(`/recipe-details/${recipe._id}`);
      return;
    }
    Swal.fire({
      title: "Do you want to spend 10 coin?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (currentUser.coin > 10) {
          const res = await updateCoin({
            creatorEmail: recipe.creatorEmail,
            viewerEmail: currentUser.email,
            type: "normal",
          }).unwrap();
          if (res.success === true) {
            navigate(`/recipe-details/${recipe._id}`);
            refetch();
          }
        } else {
          navigate(`/buy-coin`);
        }
      }
    });
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
            onClick={() => handleViewRecipe(recipe)}
          >
            View The Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
