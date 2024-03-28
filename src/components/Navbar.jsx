import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={handleClickLogOut}>Log Out</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
