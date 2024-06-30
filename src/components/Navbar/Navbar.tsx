import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useGetSingleUserQuery } from "../../redux/features/auth/authApi";
import CountUp from "react-countup";
import { FaCoins } from "react-icons/fa";
import { TUser } from "../../interface/interface";

const Navbar = () => {
  const token: Partial<TUser> | null = useAppSelector(
    (state) => state.auth.user
  );
  const { data } = useGetSingleUserQuery({ email: token?.email });
  const currentUser = data?.data;

  const { handleGoogleSignIn, handleSignOut } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddRecipes = () => {
    if (currentUser) {
      navigate("/add-recipe");
    } else {
      handleGoogleSignIn();
    }
  };

  return (
    <nav
      className={`navbar fixed top-0 z-50 transition-all duration-300 text-white font-bold py-4 w-full ${
        isScrolled ? "backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="navbar-start">
        <Link to={"/"}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Home
          </button>
        </Link>
      </div>

      <div className="navbar-center  lg:flex gap-5">
        <Link to={"recipes"}>
          <button className="btn btn-neutral">Recipes</button>
        </Link>
        {token && (
          <button onClick={handleAddRecipes} className="btn btn-neutral">
            Add Recipes
          </button>
        )}
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-5">
          <div className="flex items-center space-x-2 text-white bg-green-500 p-3 rounded-md">
            <FaCoins className="text-yellow-400 text-2xl" />
            <CountUp
              end={currentUser?.coin}
              duration={1}
              className="text-xl font-semibold"
            />
          </div>
          <img
            className="size-14 rounded-full"
            src={currentUser?.photoURL}
            alt=""
          />
          {currentUser ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSignOut}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleGoogleSignIn}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
