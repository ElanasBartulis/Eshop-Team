import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <Route 
            path="/user" 
            element={
              sessionState.isLogged ? (
                userData?.admin ? <Navigate to="/admin" replace /> : <UserPanel />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/admin"
            element={
              sessionState.isLogged ? (
                userData?.admin ? <Admin /> : <Navigate to="/user" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
  );
}

export default App;
