import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { toast } from "sonner";
import { ReactNode, useEffect } from "react";
import { useGetSingleUserQuery } from "../redux/features/auth/authApi";
import { useGetSingleRecipeQuery } from "../redux/features/recipe/recipeApi";
import { TUser } from "../interface/interface";

interface Tprops {
  children: ReactNode;
}

const PrivateRecipeDetails: React.FC<Tprops> = ({ children }) => {
  const token: Partial<TUser> | null = useAppSelector(
    (state) => state.auth.user
  );
  const { id } = useParams<{ id: string }>();

  console.log(token);
  const { data: user, isLoading: userLoading } = useGetSingleUserQuery({
    email: token?.email,
  });
  const { data: recipeData, isLoading: recipeLoading } =
    useGetSingleRecipeQuery(id);

  useEffect(() => {
    if (!token) {
      toast.warning("Login First!");
    }
  }, [token]);

  if (userLoading || recipeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  const currentUser = user?.data;
  const recipe = recipeData?.data;

  if (currentUser && recipe) {
    if (
      currentUser.email === recipe.creatorEmail ||
      recipe.purchased_by.includes(currentUser.email)
    ) {
      return children;
    } else {
      toast.warning("You don't have access to this recipe");
    }
  }

  return <Navigate to="/" />;
};

export default PrivateRecipeDetails;
