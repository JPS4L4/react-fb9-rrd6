import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "Usuario ya registrado",
          });
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Email no valido",
          });
          break;
        default:
          console.log("Error: " + error.code);
          break;
      }
    }
  };

  return (
    <>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de email incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Repita la contraseña"
          {...register("repassword", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </>
  );
};

export default Register;
