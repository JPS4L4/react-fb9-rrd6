import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import { Outlet, useNavigate } from "react-router-dom";

const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
