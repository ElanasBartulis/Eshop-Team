import { TextField } from '@mui/material';
export default function EditProfile({ activeSection }) {
  return (
    <>
      {activeSection === 'editProfile' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Change your data</h2>
          <form className="flex flex-col gap-14">
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              label="Change email"
              name="email"
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
              type="text"
              fullWidth
              label="Change phone number"
              name="phoneNumber"
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
              type="text"
              fullWidth
              label="Change address"
              name="address"
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
              type="text"
              fullWidth
              label="Change post code"
              name="postCode"
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
              Save changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}
