export function validateSignup({ userId, password1, password2, username }) {
  const errors = {};

  if (!userId) {
    errors.userId = "Please enter your email address.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userId)) {
    errors.userId = "This email address is malformed.";
  }

  if (!password1) {
    errors.password1 = "Please enter your password.";
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password1)) {
    errors.password1 =
      "Please enter at least 6 characters including English and numbers.";
  }

  if (!password2) {
    errors.password2 = "Please enter your password again.";
  } else if (password1 !== password2) {
    errors.password2 = "Passwords do not match.";
  }

  if (!username) {
    errors.username = "Please enter your name.";
  }

  return errors;
}

export function validateLogin({ userId, password }) {
  const errors = {};

  if (!userId) {
    errors.userId = "Please enter your email address.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userId)) {
    errors.userId = "This email address is malformed.";
  }

  if (!password) {
    errors.password = "Please enter your password.";
  } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
    errors.password =
      "Please enter at least 6 characters including English and numbers.";
  }

  return errors;
}
