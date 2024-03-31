export const fbErrors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "Usuario ya registrado",
      };

    case "auth/invalid-email":
      return {
        code: "email",
        message: "Email invalido",
      };

    case "auth/missing-email":
      return {
        code: "email",
        message: "Email es requerido",
      };

    case "auth/weak-password":
      return {
        code: "password",
        message: "Contraseña débil",
      };

    case "auth/invalid-credential":
      return {
        code: "password",
        message: "Email o Contraseña equivocado",
      };

    default:
      return {
        code: "Email",
        message: `Error no identificado: ${code}`,
      };
  }
};
