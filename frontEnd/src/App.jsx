import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin.jsx";
import UserPanel from "./pages/UserPanel";
import SessionContext from "./context/SessionContext.js";
import { useState } from "react";

function App() {
  const [sessionState, setSessionState] = useState({ isLogged: false });
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        sessionState,
        setSessionState,
        userData,
        setUserData,
        open,
        setOpen,
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
