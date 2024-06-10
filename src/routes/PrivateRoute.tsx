import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";

interface Tprops {
  children: ReactNode;
}

const PrivateRoute: React.FC<Tprops> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.user);

  if (token) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
