import { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import SessionContext from '../context/SessionContext.js';

export default function SnackbarComponent() {
  const { isSnackbarOpen, setSnackbarOpen, snackbarMessage, errorMessage } =
    useContext(SessionContext);
  return (
    <div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          sx={{ width: '100%' }}
          color={errorMessage ? 'success' : 'error'}
          severity="error"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
