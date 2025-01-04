import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import UserPanel from './pages/UserPanel';
import SessionContext from "./context2/SessionContext.js";
import { useState } from "react";

function App() {
  const [ sessionState, setSessionState ] = useState({ isLogged: false });
  return (
    <SessionContext.Provider value={{sessionState, setSessionState}}>
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={ <Dashboard />}
        />
        <Route
          path="/user"
          element={<UserPanel />}
        />
        
      </Routes>
      <Routes>
        {sessionState.isLogged ? (
          <Route
            path="/admin"
            element={<Admin />}
          />
        ) : (
          <Route
            path="/"
            element={<Dashboard />}
          />
        )
        }
      </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
    
  );
}

export default App;
