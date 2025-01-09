import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin.jsx";
import UserPanel from "./pages/UserPanel";
import SessionContext from "./context/SessionContext.js";
import { useState } from "react";

function App() {
  const [sessionState, setSessionState] = useState({ isLogged: false });
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <SessionContext.Provider
      value={{
        sessionState,
        setSessionState,
        userData,
        setUserData,
        open,
        setOpen,
        isSnackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<UserPanel />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/admin"
            element={
              userData?.admin && sessionState.isLogged ? (
                <Admin />
              ) : (
                <Dashboard />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
  );
}

export default App;
