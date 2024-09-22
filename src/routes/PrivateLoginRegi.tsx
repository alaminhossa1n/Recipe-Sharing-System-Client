import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";

interface Tprops {
  children: ReactNode;
}

const PrivateLoginRegi: React.FC<Tprops> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.user);

  if (token) {
    return <Navigate to="/"></Navigate>;
  } else {
    return children;
  }
};

export default PrivateLoginRegi;
