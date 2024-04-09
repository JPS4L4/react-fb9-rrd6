import { Link, NavLink } from "react-router-dom";
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

  const btnBlue =
    "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

  const btnRed =
    "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

  const btnGreen =
    "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img
            className="w-20 h-20"
            src="https://png.pngtree.com/png-clipart/20230307/original/pngtree-realistic-web-url-icon-background-png-image_8975518.png"
            alt="logo pagina"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Acortador URL's
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <NavLink to="/" className={btnBlue}>
                Inicio
              </NavLink>

              <NavLink to="/perfil" className={btnGreen}>
                Perfil
              </NavLink>

              <button onClick={handleClickLogOut} className={btnRed}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={btnBlue}>
                Ingresar
              </NavLink>

              <NavLink to="/register" className={btnGreen}>
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
