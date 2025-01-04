import { TextField } from '@mui/material';
export default function ChangePassword({ activeSection }) {
  return (
    <>
      {activeSection === 'changePassword' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Change your password</h2>
          <form className="flex flex-col gap-14">
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
