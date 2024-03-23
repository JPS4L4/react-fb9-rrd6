import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setUser(True);
    navigate("/")
  };

  return (
    <>
      <h1>Login</h1>
      <h2>{user ? "Online" : "Offline"}</h2>
      <button onClick={handleClick}>Acceder</button>
    </>
  );
};
export default Login;
