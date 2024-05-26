import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const { handleGoogleSignIn, handleSignOut } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <Link to={"/"}>
          <a className="btn text-xl">Home</a>
        </Link>
      </div>

      <div className="navbar-center  lg:flex gap-5">
        <Link to={"recipes"}>
          <button className="btn btn-neutral">Recipes</button>
        </Link>
        <Link to={"add-recipe"}>
          <button className="btn btn-neutral">Add Recipes</button>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-5">
          <p>Coin: {currentUser?.coin}</p>
          <img
            className="size-14 rounded-full"
            src={currentUser?.photoURL}
            alt=""
          />
          {currentUser ? (
            <button onClick={handleSignOut} className="btn">
              Logout
            </button>
          ) : (
            <button onClick={handleGoogleSignIn} className="btn">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
