import { TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import SessionContext from '../../context/SessionContext';
import SnackbarComponent from '../SnackBarComponent';
import { registrationSchema } from '../../../../backEnd/utils/validations/UserSchema';
export default function EditProfile({ activeSection }) {
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setErrorMessage,
    updateUserData,
    userData,
  } = useContext(SessionContext);

  //Steitas sekti formos duomenis del keitimu
  const [formValues, setFormValues] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    postCode: '',
  });

  useEffect(() => {
    setFormValues({
      email: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      address: userData.address || '',
      postCode: userData.postCode || '',
    });
  }, [userData]);
  // Steitas reikalingas siusti tik tuos laukus i backa kurie buvo editinti
  const [changedFields, setChangedFields] = useState({});
  // Lablai normaliam erroru atvaizdavimui
  const fieldLabels = {
    email: 'Email',
    phoneNumber: 'Phone Number',
    address: 'Address',
    postCode: 'Post Code',
  };

  const handleInputChange = (field) => (e) => {
    const newValue = e.target.value;
    setFormValues((prev) => ({ ...prev, [field]: newValue }));

    setChangedFields((prev) => ({ ...prev, [field]: true }));
  };

  async function editProfile(e) {
    e.preventDefault();

    //funkcija neleidzianti updatinti datos jeigu laukeliai nera pakeisti (grazina ture arba false//)
    const noChanges = Object.keys(formValues).every(
      (key) => formValues[key] === userData[key]
    );
    if (noChanges) {
      setSnackbarOpen(true);
      setSnackbarMessage('Cant change into same');
    }

    const updatingData = Object.keys(changedFields).reduce((acc, key) => {
      if (changedFields[key]) {
        acc[key] = formValues[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatingData).length === 0) {
      setErrorMessage(false);
      setSnackbarOpen(true);
      setSnackbarMessage('Please edit atleast one field, to make changes.');
      return; // Prevent further execution
    }

    const validation = registrationSchema
      .pick({
        email: true,
        phoneNumber: true,
        address: true,
        postCode: true,
      })
      .partial();

    const validatedData = validation.safeParse(updatingData);
    const errMessage = validatedData.error?.issues[0].message;

    if (validatedData.error) {
      setErrorMessage(false);
      setSnackbarOpen(true);
      setSnackbarMessage(errMessage);
      return;
    }

    try {
      const promise = await fetch('http://localhost/server/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatingData),
      });

      if (promise.ok) {
        const response = await promise.json();

        const updatedFields = response.updatedFields;

        updateUserData(updatedFields);

        setFormValues((prev) => ({
          ...prev,
          ...updatedFields,
        }));
        setChangedFields({});
        setErrorMessage(true);
        setSnackbarOpen(true);
        setSnackbarMessage(
          Object.keys(updatingData)
            .map((field) => `${fieldLabels[field]} was updated!`)
            .join('. ')
        );
      } else {
        setErrorMessage(false);
        setSnackbarOpen(true);
        setSnackbarMessage(errMessage);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(false);
      setSnackbarOpen(true);
      setSnackbarMessage('An error occurred. Please try again.');
    }
  }

  return (
    <>
      {activeSection === 'editProfile' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Change your data</h2>
          <form
            className="flex flex-col gap-14"
            onSubmit={editProfile}
          >
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              label="Change email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange('email')}
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
              value={formValues.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
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
              value={formValues.address}
              onChange={handleInputChange('address')}
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
              value={formValues.postCode}
              onChange={handleInputChange('postCode')}
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
              Save changes!
            </button>
            <SnackbarComponent />
          </form>
        </div>
      )}
    </>
  );
}
