import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import { fbErrors } from "../utils/fbErrors";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "123123",
      repassword: "123123",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      setError("firebase", { message: fbErrors(error.code) });
    }
  };

  return (
    <>
      <h1>Registrarse</h1>
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
        >
          <FormError error={errors.password} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="Repita la contraseña"
          {...register("repassword", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <button type="submit">Registrarse</button>
      </form>
    </>
  );
};

export default Register;
