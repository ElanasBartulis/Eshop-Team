import { TextField } from '@mui/material';
import SessionContext from '../../context/SessionContext.js';
import { useContext } from 'react';
import { registrationSchema } from '../../../../backEnd/utils/validations/UserSchema.js';
import SnackbarComponent from '../SnackBarComponent';

export default function ChangePassword({ activeSection }) {
  const { setSnackbarOpen, setSnackbarMessage, setErrorMessage } =
    useContext(SessionContext);

  async function changePassword(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!(formData.get('password') === formData.get('repeatPassword'))) {
      setErrorMessage(false);
      setSnackbarOpen(true);
      setSnackbarMessage("Password don't match");
      return;
    }

    const passwordData = {
      password: formData.get('password'),
    };
    const passwordValidation = registrationSchema.pick({ password: true });
    const validatedPw = passwordValidation.safeParse(passwordData);
    const errorMesseges = validatedPw.error?.issues[0].message;

    try {
      const promise = await fetch('/server/api/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      });

      if (promise.ok) {
        setErrorMessage(true);
        setSnackbarOpen(true);
        setSnackbarMessage('Password changed successfully');
        e.target.reset();
      } else {
        setErrorMessage(false);
        setSnackbarOpen(true);
        setSnackbarMessage(errorMesseges);
      }
    } catch (error) {
      setErrorMessage(false);
      setSnackbarOpen(true);
      setSnackbarMessage('An error occurred. Pasword didnt change.');
      console.error('Error during passsword change:', error);
    }
  }

  return (
    <>
      {activeSection === 'changePassword' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Change your password</h2>
          <form
            className="flex flex-col gap-14"
            onSubmit={changePassword}
          >
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              label="New password"
              name="password"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: 'rgb(17 24 39)',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgb(17 24 39)',
                },
              }}
            />
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              label="Repeat new password"
              name="repeatPassword"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: 'rgb(17 24 39)',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgb(17 24 39)',
                },
              }}
            />
            <button className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800">
              Change Password
            </button>
            <SnackbarComponent />
          </form>
        </div>
      )}
    </>
  );
}
