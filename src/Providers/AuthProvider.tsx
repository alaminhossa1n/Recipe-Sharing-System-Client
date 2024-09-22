/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { jwtDecode } from "jwt-decode";
import { useGoogleLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import app from "../firebase/firebase.init";
import { logout, setToken } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

interface AuthContextType {
  handleGoogleSignIn: () => Promise<void>;
  handleSignOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

interface Tprops {
  children: ReactNode;
}

const AuthProvider: React.FC<Tprops> = ({ children }) => {
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;

      const postData = {
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      };

      try {
        const res = await googleLogin(postData).unwrap();
        if (res.success === true) {
          const userDecoded = jwtDecode(res.data.token);
          dispatch(setToken({ user: userDecoded, token: res.data.token }));
          toast.success("Login Successful.");
        }
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

  const authInfo = {
    handleGoogleSignIn,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={authInfo as any}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
