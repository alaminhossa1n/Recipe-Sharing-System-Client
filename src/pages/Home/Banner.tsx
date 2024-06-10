import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useAppSelector } from "../../redux/hooks";

const Banner = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { handleGoogleSignIn } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSeeRecipes = () => {
    navigate("/recipes");
  };

  const handleAddRecipes = () => {
    if (currentUser) {
      navigate("/add-recipe");
    } else {
      handleGoogleSignIn();
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.cordonbleu.edu/Files/MediaFile/63472.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 md:p-10 rounded-lg text-center max-w-lg md:max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Discover Delicious Recipes
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-8">
          Cook, Share, and Enjoy with Our Community
        </p>
        <div className="flex flex-col md:flex-row justify-center">
          <button
            onClick={handleSeeRecipes}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 md:mr-4"
          >
            See Recipes
          </button>
          <button
            onClick={handleAddRecipes}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
