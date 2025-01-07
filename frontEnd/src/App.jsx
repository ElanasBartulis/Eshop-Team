import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin.jsx';
import UserPanel from './pages/UserPanel';
import SessionContext from "./context2/SessionContext.js";
import { useState } from "react";

function App() {
  const [ sessionState, setSessionState ] = useState({ isLogged: false });
  const [ adminData, setAdminData ] = useState({ });
  console.log("Sesija", sessionState.isLogged);
  console.log("Adminas", adminData);
  return (
    <SessionContext.Provider value={{sessionState, setSessionState, adminData, setAdminData}}>
      <BrowserRouter>
      <Routes>
        <Route
          path="/user"
          element={<UserPanel />}
        />
        <Route
          path="/"
          element={<Dashboard /> }
        />
        <Route
          path="/admin"
          element={ adminData.admin && sessionState.isLogged ?  <Admin />:  <Dashboard/> }
        />
      </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
    
  );
}

export default App;
