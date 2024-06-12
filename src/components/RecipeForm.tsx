import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRecipeMutation } from "../redux/features/recipe/recipeApi";
import { TRecipe, TUser } from "../interface/interface";
import { toast } from "sonner";
import { useAppSelector } from "../redux/hooks";

const RecipeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRecipe>();

  const [addRecipe] = useAddRecipeMutation();
  const currentUser: Partial<TUser> | null = useAppSelector(
    (state) => state.auth.user
  );

  const onSubmit: SubmitHandler<TRecipe> = async (data: Partial<TRecipe>) => {
    data.creatorEmail = currentUser?.email;

    const formData = new FormData();

    // Append the image if it exists
    if (data.recipeImage && data.recipeImage[0]) {
      formData.append("image", data.recipeImage[0]);
    }

    // Append other required fields
    formData.append("recipeName", data.recipeName || "");
    formData.append("recipeDetails", data.recipeDetails || "");
    formData.append("country", data.country || "");
    formData.append("category", data.category || "");
    formData.append("creatorEmail", data.creatorEmail || "");
    try {
      const res = await addRecipe(data).unwrap();
      if (res.success === true) {
        toast.success("Product Added Successfully!");
        console.log(res);
        reset();
      }
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Recipe Name</label>
          <input
            type="text"
            {...register("recipeName", { required: "Recipe name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.recipeName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recipeName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Recipe Image URL</label>
          <input
            type="file"
            {...register("recipeImage", {
              required: "Recipe image URL is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.recipeImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recipeImage.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Recipe Details</label>
          <textarea
            {...register("recipeDetails", {
              required: "Recipe details are required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.recipeDetails && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recipeDetails.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Video URL</label>
          <input
            type="text"
            {...register("video", { required: "Video URL is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.video && (
            <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
