import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { fbErrors } from "../utils/fbErrors";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "123456",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = fbErrors(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text={"Ingreso de Usuario"} />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
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
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "Escribe algo";
                }
                return true;
              },
            },
          })}
          label="Ingresa tu contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>
        <Button text="Ingresar" type="submit" />
      </form>
    </>
  );
};
export default Login;
