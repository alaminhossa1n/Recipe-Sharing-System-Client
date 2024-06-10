import Swal from "sweetalert2";
import { TRecipe, TUser } from "../interface/interface";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  useGetSingleUserQuery,
  useUpdateCoinMutation,
} from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useUpdateRecipeMutation } from "../redux/features/recipe/recipeApi";
import { useState } from "react";

interface RecipeCardProps {
  recipe: TRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const token: Partial<TUser | null> = useAppSelector(
    (state) => state.auth.user
  );
  const [updateCoin] = useUpdateCoinMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const { data, refetch } = useGetSingleUserQuery({ email: token?.email });
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionCount, setReactionCount] = useState(0);
  const currentUser = data?.data;

  const navigate = useNavigate();

  const handleViewRecipe = (recipe: TRecipe) => {
    if (!token) {
      toast.warning("To view recipe details, Please login First.");
      return;
    }

    if (recipe.creatorEmail === currentUser.email) {
      navigate(`/recipe-details/${recipe._id}`);
      return;
    }

    const parchedUser = recipe.purchased_by
      ? recipe.purchased_by.find((n) => n === currentUser.email)
      : undefined;

    if (parchedUser === currentUser.email) {
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
        if (currentUser.coin >= 10) {
          const res = await updateCoin({
            creatorEmail: recipe.creatorEmail,
            viewerEmail: currentUser.email,
            type: "normal",
          }).unwrap();
          if (res.success === true) {
            const res = await updateRecipe({
              id: recipe._id,
              recipeInfo: { email: currentUser.email },
            });
            if (res.data.success === true) {
              toast.success("Now you have access of this recipe");
              navigate(`/recipe-details/${recipe._id}`);
              refetch();
            }
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

    // const updatedReactions = hasReacted
    //   ? recipe.reactions.filter((email) => email !== currentUser.email)
    //   : [...recipe.reactions, currentUser.email];

    // try {
    //   await updateRecipe({
    //     id: recipe._id,
    //     recipeInfo: { reactions: updatedReactions },
    //   }).unwrap();
    //   setHasReacted(!hasReacted);
    // } catch (error) {
    //   toast.error("Failed to update reaction.");
    // }
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
          <strong>Purchased By:</strong> {recipe.purchased_by.join(", ")}
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
            <button
              className={`btn ${hasReacted ? "text-primary" : "text-gray-400"}`}
              onClick={handleReactionClick}
            >
              👍
            </button>
            <span className="ml-2 text-gray-700">{reactionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
