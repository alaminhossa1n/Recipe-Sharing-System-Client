import RecipeCard from "../../components/RecipeCard";
import { TRecipe } from "../../interface/interface";
import { useGetAllRecipeQuery } from "../../redux/features/recipe/recipeApi";

const Recipes: React.FC = () => {
  const { data, isLoading, isError } = useGetAllRecipeQuery(null);

  const recipes: TRecipe[] = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading recipes.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3">
        {recipes &&
          recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default Recipes;
