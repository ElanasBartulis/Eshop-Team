import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionContext from '../context/SessionContext';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const { sessionState, setSessionState, setUserData, setErrorHandler } =
    useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch('/server/api/users/log-out', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setUserData(null);
      setSessionState({ isLogged: false });
      navigate('/');
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Logged out successfully!',
        alertColor: 'success',
      });
      window.location.reload();
    } else {
      console.error('Logout failed');
    }
  };

  return sessionState.isLogged ? (
    <button onClick={handleLogout}>
      <LogOut
        size={22}
        color="#991B1B"
      />
    </button>
  ) : null;
}
