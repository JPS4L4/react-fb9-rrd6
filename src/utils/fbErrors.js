export const fbErrors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Usuario ya registrado";

    case "auth/invalid-email":
      return "Email invalido";

    default:
      return `Error no registrado: ${code}`;
  }
};
