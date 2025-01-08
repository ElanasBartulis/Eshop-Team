import { TextField, Button } from "@mui/material";

export default function Password() {
  return (
    <div>
      <h1 className="text-xl font-bold">Change Password</h1>
      <div className="h-svh mt-3 flex flex-col">
        <TextField
          type="text"
          variant="standard"
          label="New password"
          name="password"
        />
        <TextField
          type="text"
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
      </div>
    </div>
  );
}
