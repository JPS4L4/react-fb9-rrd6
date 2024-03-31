import { Routes, Route } from "react-router";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";

import "flowbite";
import LayoutContainerForm from "./components/LayoutContainerForm";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
