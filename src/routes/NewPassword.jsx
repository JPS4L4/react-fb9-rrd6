import { useForm } from "react-hook-form";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

import { fbErrors } from "../utils/fbErrors";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";

const NewPassword = () => {
  document.title = "Reestablecer contraseña";

  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

/*   const isEmailRegistered = async (email) => {
    try {
      const signInMethods = getAuth().fetchSignInMethodsForEmail(email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }; */

  const onSubmit = async ({ email }) => {
    try {
      setLoading(true);
      const verifyEmail = await isEmailRegistered(email);
      if (verifyEmail) {
        setVerify(true);
      } else {
        setError("email", {
          type: "manual",
          message: "El correo electrónico no está registrado",
        });
      }
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      const { code, message } = fbErrors(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = () => {};

  return (
    <div>
      <Title text="Recupera tu cuenta  (Sin terminar)"></Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {verify ? (
          <div>
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
                    v === getValues("password") ||
                    "No coinciden las contraseñas",
                },
              })}
              label="Repite tu contraseña"
              error={errors.repassword}
            >
              <FormError error={errors.repassword} />
            </FormInput>

            <div className="flex justify-center items-center">
              <Button
                text="Actualizar"
                type="button"
                style="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                loading={loading}
                onclick={() => handleUpdatePassword()}
              />
            </div>
          </div>
        ) : (
          <div>
            <FormInput
              type="email"
              placeholder="Ingresa el correo de tu cuenta"
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
            <div className="flex justify-center items-center">
              <Button
                text="Enviar"
                type="submit"
                style="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                loading={loading}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewPassword;
