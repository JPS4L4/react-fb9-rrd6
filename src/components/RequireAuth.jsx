import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return children;
};

export default RequireAuth;
