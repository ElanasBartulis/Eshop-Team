import { TextField } from '@mui/material';
import SessionContext from '../../context/SessionContext.js';
import { useContext } from 'react';
import { registrationSchema } from '../../../../backEnd/utils/validations/UserSchema.js';

export default function ChangePassword({ activeSection }) {
  const { userData } = useContext(SessionContext);

  async function changePassword(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!(formData.get('password') === formData.get('repeatPassword'))) {
      return alert('Passwords must match');
    }

    const passwordData = {
      password: formData.get('password'),
    };
    const passwordValidation = registrationSchema.pick({ password: true });
    const validatedPw = passwordValidation.safeParse(passwordData);
    if (!validatedPw.success) {
      console.log(validatedPw);
      validatedPw.error.issues.forEach((issue) => alert(issue.message));
      return;
    }

    try {
      const promise = await fetch('http://localhost/server/api/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      });

      const response = await promise.json();
      console.log('TIKRINU', response.error[0].message);
      if (promise.ok) {
        alert('Password changed');
        e.target.reset();
      } else return alert('Pasword didnt change');
    } catch (error) {
      console.error('Error during passsword change:', error);
      //keisti
      alert('An error occurred. Please try again.');
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
          </form>
        </div>
      )}
    </>
  );
}
