import { TextField, Button } from "@mui/material";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import SnackbarComponent from "../SnackBarComponent";
import { registrationSchema } from "../../../../backEnd/utils/validations/UserSchema";

export default function Password() {
  const { setErrorHandler } = useContext(SessionContext);

  async function handleChangePw(e) {
    e.preventDefault();
    const fromData = new FormData(e.target);

    // patikrina as repeat pw toks pats
    if (fromData.get("password") !== fromData.get("repeatPassword")) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "Password don't match",
        alertColor: "error",
      });
      return;
    }

    // server request
    const pw = { password: fromData.get("password") };

    const pwValidation = registrationSchema.pick({ password: true });
    const validatedPw = pwValidation.safeParse(pw);
    const validatedErrorMessage = validatedPw.error?.issues[0].message;

    try {
      const promise = await fetch("/server/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pw),
      });

      // jeigu viskas ok
      if (promise.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Password changed successfully",
          alertColor: "success",
        });
        e.target.reset();
        // jeigu ne
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: validatedErrorMessage,
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
  return (
    <div>
      <h1 className="text-xl font-bold">Change Password</h1>
      <form onSubmit={handleChangePw} className="h-svh mt-3 flex flex-col">
        <TextField
          type="password"
          variant="standard"
          label="New password"
          name="password"
        />
        <TextField
          type="password"
          variant="standard"
          label="Repeat new password"
          name="repeatPassword"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "#f9fafb",
            bgcolor: "#111827",
            alignSelf: "flex-start",
            mt: "1rem",
          }}
        >
          Submit
        </Button>
        <SnackbarComponent />
      </form>
    </div>
  );
}
