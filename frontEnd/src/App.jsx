import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin.jsx';
import UserPanel from './pages/UserPanel';
import SessionContext from './context/SessionContext.js';
import { useCallback, useMemo, useState } from 'react';
import useSessionCheck from './custom-hooks/useSessionCheck.js';
import { Backdrop, CircularProgress } from '@mui/material';
import Checkout from './pages/Checkout.jsx';
import SearchContext from './context/SearchContext';
import { CartProvider } from './context/CartContext.jsx';
import SalesPage from './pages/Sales.jsx';
import Payment from './pages/Payment.jsx';

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
  const [isSearching, setIsSearching] = useState(false);
  ///Function to update user data, after changes are made.
  //
  const updateUserData = useCallback((newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  }, []);
  //
  //Memoize Session Context Value;
  const sessionContextValue = useMemo(
    () => ({
      sessionState,
      setSessionState,
      userData,
      setUserData,
      open,
      setOpen,
      errorHandler,
      setErrorHandler,
      updateUserData,
    }),
    [sessionState, userData, open, errorHandler]
  );
  ///
  const searchContextValue = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      filteredProducts,
      setFilteredProducts,
      isSearching,
      setIsSearching,
    }),
    [searchTerm, filteredProducts, isSearching]
  );
  //custom hook to get session data
  useSessionCheck({ setSessionState, setUserData, setIsCheckingSession });
  //For loading screen state
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
    <SessionContext.Provider value={sessionContextValue}>
      <SearchContext.Provider value={searchContextValue}>
        <CartProvider>
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
                element={<Checkout />}
              />
              <Route
                path="/sales"
                element={<SalesPage />}
              />
              <Route
                path="/payment"
                element={<Payment />}
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchContext.Provider>
    </SessionContext.Provider>
  );
}

export default App;
