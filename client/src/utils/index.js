const ERRORS_FROM_TWITTER_API = [
  "User has been suspended",
  "does not match",
  "Could not find user with username",
];

const ERRORS_TRANSLATED = [
  "Este usuario ha sido suspendido.",
  "El usuario ingresado no es correcto.",
  "No pudimos encontrar el usuario ingresado.",
];

const ERROR_DEFAULT =
  "Ocurrió un problema. Por favor, controla el usuario e intenta nuevamente.";

export const translateError = errors => {
  const firstError = errors[0];
  const description = firstError?.detail ?? firstError?.message;
  console.log(description);

  if (description) {
    for (let i = 0; i < ERRORS_FROM_TWITTER_API.length; i++) {
      if (description.includes(ERRORS_FROM_TWITTER_API[i])) {
        return ERRORS_TRANSLATED[i];
      }
    }
  } else {
    return ERROR_DEFAULT;
  }
};
