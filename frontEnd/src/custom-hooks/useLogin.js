import { useContext, useEffect, useState } from "react";
import SessionContext from "../context2/SessionContext.js";

export default function useLogin() {
  const { setSessionState, setAdminData } = useContext(SessionContext);

  useEffect(() => {
    async function checkSession() {
      const promise = await fetch("http://localhost/server/api/users/session");
      const response = await promise.json();
      if (promise.ok && response.isLogged) {
        setSessionState({ isLogged: true });
        setAdminData({
          ...response.user,
          admin: response.user.admin,
        });
        console.log(response.user);
      }
    }
    checkSession();
  }, [setSessionState, setAdminData]);

  async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost/server/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionState({ isLogged: true });
        setAdminData({
          ...data.session.admin,
          admin: data.session.admin,
        });
        console.log("Data", data.session);
        alert("Login successful!");
      } else {
        const errorText = await response.text();
        const error = errorText
          ? JSON.parse(errorText)
          : { message: "An error occurred" };
        alert(error.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return { onLogin };
}
