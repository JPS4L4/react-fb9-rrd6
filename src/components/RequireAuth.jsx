import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router";

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
