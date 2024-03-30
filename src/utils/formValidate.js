export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: "Campo Obligatorio",
    },
    patternEmail: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Formato de email incorrecto",
    },
    minLength: { value: 6, message: "Mínimo 6 caracteres" },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "Escribe algo";
        }
        return true;
      },
    },
  };
};
