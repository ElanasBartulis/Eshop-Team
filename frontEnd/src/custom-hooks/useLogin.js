import { useContext, useEffect } from 'react';
import SessionContext from '../context/SessionContext.js';

export default function useLogin() {
  const {
    sessionState,
    setSessionState,
    setUserData,
    setOpen,
    setErrorHandler,
  } = useContext(SessionContext);
  //UseEffect to get session data
  useEffect(() => {
    async function checkSession() {
      const promise = await fetch('/server/api/users/session');
      const response = await promise.json();
      if (promise.ok && response.isLogged) {
        setSessionState({ isLogged: true });
        setUserData(response.user);
      }
    }
    checkSession();
  }, []);

  async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    //Retrieve login data from inputs
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const promise = await fetch('/server/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const response = await promise.json();

      if (promise.ok) {
        setUserData(response.session.user);
        setSessionState({ isLogged: true });
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: 'Logged in successful!',
          alertColor: 'success',
        });
        setOpen(false);
      } else {
        const error = response ? response : { message: 'An error occurred' };
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: error.message,
          alertColor: 'error',
        });
      }
    } catch (error) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'An error occurred. Please try again.',
        alertColor: 'error',
      });
    }
  }

  return { onLogin };
}
