import { useContext } from "react";
import SessionContext from "../context2/SessionContext.js";

export default function useRegister() {
  const { setOpen, setUserData, setSessionState } = useContext(SessionContext);
  async function onRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!(formData.get("password") === formData.get("passwordConfirmation"))) {
      return alert("Passwords must match");
    }

    const registerData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const promise = await fetch(
        "http://localhost/server/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const response = await promise.json();

      if (promise.ok) {
        setUserData(response.session.user);
        setSessionState({ isLogged: true });
        // keisti
        alert("Register successful!");
        setOpen(false);
      } else {
        const error = response ? response : { message: "An error occurred" };
        // keisti
        alert(error.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      //keisti
      alert("An error occurred. Please try again.");
    }
  }

  return { onRegister };
}
