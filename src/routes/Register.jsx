import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      console.log("usuario creado");
      navigate("/")
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      }
    }
  };

  return (
    <>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
