import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin.jsx';
import UserPanel from './pages/UserPanel';
import SessionContext from './context/SessionContext.js';
import { useState } from 'react';
import useSessionCheck from './custom-hooks/useSessionCheck.js';
import { Backdrop, CircularProgress } from '@mui/material';
import Checkout from './pages/Checkout.jsx';
import SearchContext from './context/SearchContext';

function App() {
  const [sessionState, setSessionState] = useState({ isLogged: false });
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [errorHandler, setErrorHandler] = useState({
    isSnackbarOpen: false,
    snackbarMessage: '',
    alertColor: 'error',
  });
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  ///Naujai informacijai, po updeito gauti skirta funkcija
  const updateUserData = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  useSessionCheck({ setSessionState, setUserData, setIsCheckingSession });

  if (isCheckingSession) {
    return (
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <SessionContext.Provider
      value={{
        sessionState,
        setSessionState,
        userData,
        setUserData,
        open,
        setOpen,
        errorHandler,
        setErrorHandler,
        updateUserData,
      }}
    >
      <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredProducts, setFilteredProducts }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/user"
            element={
              sessionState.isLogged ? (
                userData?.admin ? (
                  <Navigate
                    to="/admin"
                    replace
                  />
                ) : (
                  <UserPanel />
                )
              ) : (
                <Navigate
                  to="/"
                  replace
                />
              )
            }
          />
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/admin"
            element={
              sessionState.isLogged ? (
                userData?.admin ? (
                  <Admin />
                ) : (
                  <Navigate
                    to="/user"
                    replace
                  />
                )
              ) : (
                <Navigate
                  to="/"
                  replace
                />
              )
            }
          />
          <Route
            path="/checkout"
            element={ <Checkout />}
          />
        </Routes>
      </BrowserRouter>
      </SearchContext.Provider>
    </SessionContext.Provider>
  );
}

export default App;
