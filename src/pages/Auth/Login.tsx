import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
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
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} className="border p-3">
        Login
      </button>

      <button onClick={handleSignOut} className="border p-3">
        Login
      </button>
    </div>
  );
};

export default Login;
