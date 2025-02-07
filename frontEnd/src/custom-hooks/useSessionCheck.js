import { useEffect } from 'react';

const useSessionCheck = ({
  setSessionState,
  setUserData,
  setIsCheckingSession,
}) => {
  useEffect(() => {
    async function checkSession() {
      try {
        const promise = await fetch('/server/api/users/session');
        const response = await promise.json();
        if (promise.ok && response.isLogged) {
          setSessionState({ isLogged: true });
          setUserData(response.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsCheckingSession(false);
      }
    }
    checkSession();
  }, [setSessionState, setUserData, setIsCheckingSession]);
};

export default useSessionCheck;
