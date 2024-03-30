import { useContext } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import { formValidate } from "../utils/formValidate";
import { fbErrors } from "../utils/fbErrors";
import FormError from "../components/FormError";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate;

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
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        />
        <FormError error={errors.email} />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        />
        <FormError error={errors.password} />
        <input
          type="password"
          placeholder="Repita la contraseña"
          {...register("repassword", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
        />
        <FormError error={errors.repassword} />
        <button type="submit">Registrarse</button>
      </form>
    </>
  );
};

export default Register;
