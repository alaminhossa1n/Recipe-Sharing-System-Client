import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, setUser } from "../../redux/features/auth/authSlice";
import app from "../../firebase/firebase.init";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const Navbar = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;

      const postData = {
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
        coin: 50,
      };

      try {
        const res = await login(postData).unwrap();
        console.log(res);

        const userDecoded = jwtDecode(res.data.token);
        dispatch(setUser({ user: userDecoded, token: res.data.token }));
      } catch (err) {
        console.log("Error during login:", err);
      }
    } catch (error) {
      console.log("Error during Google sign-in:", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Recipes</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-5">
          {currentUser ? (
            <button onClick={handleSignOut} className="btn">
              Logout
            </button>
          ) : (
            <button onClick={handleGoogleSignIn} className="btn">
              Login
            </button>
          )}

          <p>Coin: {currentUser?.coin}</p>
          <img
            className="size-14 rounded-full"
            src={currentUser?.photoURL}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
