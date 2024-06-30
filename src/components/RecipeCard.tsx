import Swal from "sweetalert2";
import { TRecipe, TUser } from "../interface/interface";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { BiSolidLike } from "react-icons/bi";
import { toast } from "sonner";
import { useGetSingleUserQuery } from "../redux/features/auth/authApi";
import {
  useReactRecipeMutation,
  useViewRecipeMutation,
} from "../redux/features/recipe/recipeApi";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

interface RecipeCardProps {
  recipe: TRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const token: Partial<TUser | null> = useAppSelector(
    (state) => state.auth.user
  );
  const [viewRecipe] = useViewRecipeMutation();
  const { data, refetch } = useGetSingleUserQuery({ email: token?.email });
  const [reactRecipe] = useReactRecipeMutation();
  const currentUser = data?.data;

  const [isReact, setIsReact] = useState(
    recipe.reactors?.includes(currentUser?.email) ? true : false
  );
  const navigate = useNavigate();

  const handleViewRecipe = async (recipe: TRecipe) => {
    if (!token) {
      toast.warning("To view recipe details, Please login First.");
      return;
    }

    if (recipe.creatorEmail === currentUser?.email) {
      navigate(`/recipe-details/${recipe._id}`);
      await viewRecipe({
        id: recipe._id,
        recipeInfo: {},
      }).unwrap();

      return;
    }

    const parchedUser = recipe.purchased_by
      ? recipe.purchased_by.find((n) => n === currentUser?.email)
      : undefined;

    if (parchedUser === currentUser?.email) {
      navigate(`/recipe-details/${recipe._id}`);
      await viewRecipe({
        id: recipe._id,
        recipeInfo: {},
      }).unwrap();
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
        if (currentUser.coin >= 10) {
          const res = await viewRecipe({
            id: recipe._id,
            recipeInfo: {
              viewerEmail: currentUser.email,
              creatorEmail: recipe.creatorEmail,
            },
          }).unwrap();

          if (res.success === true) {
            toast.success("Now you have access of this recipe");
            navigate(`/recipe-details/${recipe._id}`);
            refetch();
          }
        } else {
          navigate(`/buy-coin`);
        }
      }
    });
  };

  const handleReactionClick = async () => {
    if (!currentUser) {
      toast.warning("You need to be logged in to react.");
      return;
    }

    await reactRecipe({
      recipeId: recipe._id,
      viewerEmail: currentUser?.email,
      state: !isReact,
    });
    setIsReact(!isReact);
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
          <strong>Purchased By:</strong> {recipe?.purchased_by?.join(", ")}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Creator Email:</strong> {recipe.creatorEmail}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Country:</strong> {recipe.country}
        </p>
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn btn-neutral"
            onClick={() => handleViewRecipe(recipe)}
          >
            View The Recipe
          </button>
          <div className="flex items-center">
            <p className={`text-2xl text-blue-500`}>
              <FaEye />
            </p>
            <span className="ml-2 text-gray-700">{recipe?.watchCount}</span>
          </div>

          <div className="flex items-center">
            <p
              className={`cursor-pointer text-2xl ${
                recipe.reactors?.includes(currentUser?.email)
                  ? "text-blue-500"
                  : ""
              }`}
              onClick={handleReactionClick}
            >
              <BiSolidLike />
            </p>
            <span className="ml-2 text-gray-700">
              {recipe.reactors?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
