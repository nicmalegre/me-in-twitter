import {
  ERRORS_FROM_TWITTER_API,
  ERRORS_TRANSLATED,
  ERROR_DEFAULT,
} from "./constants";

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
