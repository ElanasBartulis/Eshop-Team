import { useContext, useEffect, useState } from "react";
// import SessionContext from "../context2/SessionContext.js";

export default function useRegister() {
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
      const response = await fetch(
        "http://localhost/server/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      if (response.ok) {
        alert("Register successful!");
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

  return { onRegister };
}
