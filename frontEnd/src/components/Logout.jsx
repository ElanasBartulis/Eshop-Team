import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionContext from '../context/SessionContext';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const { sessionState, setSessionState, setUserData, setErrorHandler } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
      const response = await fetch('http://srv701413.hstgr.cloud/server/api/users/log-out', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSessionState({ isLogged: false });
        setUserData({});
        navigate('/');
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Logged out successfully!",
          alertColor: "success",
        });
      } else {
        console.error('Logout failed');
      }
  };

  return sessionState.isLogged ? (
    <button onClick={handleLogout}>
        <LogOut size={22} color="#991B1B" />
    </button>
  ) : null;
};