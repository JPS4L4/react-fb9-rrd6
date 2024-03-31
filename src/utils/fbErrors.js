export const fbErrors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Usuario ya registrado";

    case "auth/invalid-email":
      return "Email invalido";

    case "auth/missing-email":
      return "Email es requerido";

    case "auth/weak-password":
      return "Contraseña debil";

    case "auth/invalid-credential":
      return "Correo o Contraseña incorrecto";

    default:
      return `Error no registrado: ${code}`;
  }
};
