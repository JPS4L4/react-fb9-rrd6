import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import Title from "../components/Title";
import Button from "../components/Button";

const Perfil = () => {
  document.title = "Perfil";

  const [loading, setLoading] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className="container p-2 bg-blue-400 rounded-2xl">
      <div className="container bg-white p-6  rounded-2xl">
        <Title text="Mi Perfil"></Title>
        <div className="flex justify-center items-center">
          <img
            src="https://img.freepik.com/vector-premium/icono-avatar-masculino-persona-desconocida-o-anonima-icono-perfil-avatar-predeterminado-usuario-redes-sociales-hombre-negocios-silueta-perfil-hombre-aislado-sobre-fondo-blanco-ilustracion-vectorial_735449-120.jpg?w=360"
            alt="imgPerfil"
            className="rounded-4xl h-32 w-40"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container mx-auto mt-5">
            <FormInput
              type="file"
              label="Escoge una imagen"
              error={errors.file}
            >
              <FormError error={errors.file} />
            </FormInput>
            <FormInput
              type="text"
              placeholder="Ingrese nombre de usuario"
              {...register("text", {
                required: {
                  value: true,
                  message: "Campo Obligatorio",
                },
              })}
              label="Ingresa tu nombre de usuario"
              error={errors.text}
            >
              <FormError error={errors.text} />
            </FormInput>
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
              type="tel"
              placeholder="Ingrese número celular"
              {...register("tel", {
                required: {
                  value: true,
                  message: "Campo Obligatorio",
                },
                pattern: {
                  value: "+?[0-9]{1,3}-?[0-9]{3,14}",
                  message: "Formato de número incorrecto",
                },
              })}
              label="Ingresa tu número de celular"
              error={errors.tel}
            >
              <FormError error={errors.tel} />
            </FormInput>
            <FormInput
              type="date"
              placeholder="DD/MM/YYYY"
              {...register("date", {
                required: {
                  value: true,
                  message: "Campo Obligatorio",
                },
              })}
              label="Ingresa tu fecha de nacimiento"
              error={errors.date}
            >
              <FormError error={errors.date} />
            </FormInput>
            <div className="flex items-center justify-center">
              <Button
                text="Editar"
                type="submit"
                style="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
