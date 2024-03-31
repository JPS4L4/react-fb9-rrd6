import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import { fbErrors } from "../utils/fbErrors";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

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
      const { code, message } = fbErrors(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text={"Registro de Usuario"} />
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
          label="Ingresa tu Correo"
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
        <FormInput
          type="password"
          placeholder="Repita la contraseña"
          {...register("repassword", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
          label="Repite tu contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <Button text="Registrarse" type="submit" />
      </form>
    </>
  );
};

export default Register;
