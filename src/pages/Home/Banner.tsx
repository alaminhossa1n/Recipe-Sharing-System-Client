import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useAppSelector } from "../../redux/hooks";

const Banner = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { handleGoogleSignIn } = useContext(AuthContext);
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
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover Delicious Recipes
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Cook, Share, and Enjoy with Our Community
        </p>
        <div>
          <button
            onClick={handleSeeRecipes}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-4"
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
