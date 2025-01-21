import { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import SessionContext from '../context/SessionContext.js';

export default function SnackbarComponent() {
  //   const [errorHandler, seterrorHandler] = useState({
  //   isSnackbarOpen: false,
  //   snackbarMessage: "",
  //   alertColor: "error",
  // });
  const { errorHandler, setErrorHandler } = useContext(SessionContext);

  return (
    <div>
      <Snackbar
        open={errorHandler.isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() =>
          setErrorHandler((c) => ({ ...c, isSnackbarOpen: false }))
        }
      >
        <Alert
          variant="filled"
          sx={{ width: '100%' }}
          color={errorHandler.alertColor}
        >
          {errorHandler.snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
