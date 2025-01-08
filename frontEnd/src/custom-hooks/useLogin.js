import { useContext, useEffect } from "react";
import SessionContext from "../context/SessionContext.js";

export default function useLogin() {
  const { sessionState, setSessionState, setUserData, setOpen } =
    useContext(SessionContext);

  useEffect(() => {
    async function checkSession() {
      const promise = await fetch("http://localhost/server/api/users/session");
      const response = await promise.json();
      if (promise.ok && response.isLogged) {
        setSessionState({ isLogged: true });
        setUserData(response.user);
      }
    }
    checkSession();
  }, []);

  async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const promise = await fetch("http://localhost/server/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      console.log("Siaip: ", sessionState.isLogged);

      const response = await promise.json();
      console.log("Is useLogin", response.session.user);
      if (promise.ok) {
        setUserData(response.session.user);
        setSessionState({ isLogged: true });
        // pakeisti
        alert("Login successful!");
        setOpen(false);
      } else {
        const error = response ? response : { message: "An error occurred" };
        //pakeisti
        alert(error.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      //pakeisti
      alert("An error occurred. Please try again.");
    }
  }

  return { onLogin };
}
