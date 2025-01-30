import { useContext } from "react";
import SessionContext from "../context/SessionContext.js";

export default function useRegister() {
  const { setOpen, setUserData, setSessionState, setErrorHandler } =
    useContext(SessionContext);
  async function onRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!(formData.get("password") === formData.get("passwordConfirmation"))) {
      return setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "Passwords must match",
        alertColor: "error",
      });
    }

    const registerData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const promise = await fetch("/server/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const response = await promise.json();

      if (promise.ok) {
        setUserData(response.session.user);
        setSessionState({ isLogged: true });
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Registration successful!",
          alertColor: "success",
        });
        setOpen(false);
      } else {
        // if response is not ok
        const error = response
          ? // give me 1st zod validation
            response.error[0]
          : // else this
            { message: "An error occurred" };

        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: error.message,
          alertColor: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "An error occurred. Please try again.",
        alertColor: "error",
      });
    }
  }

  return { onRegister };
}
