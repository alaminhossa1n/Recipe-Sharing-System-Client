import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ children }) => {
  const token = useAppSelector((state) => state.auth.user);

  if (token) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
