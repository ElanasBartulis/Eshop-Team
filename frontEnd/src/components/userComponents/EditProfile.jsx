import { TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import SessionContext from '../../context/SessionContext';
import SnackbarComponent from '../SnackBarComponent';
import { registrationSchema } from '../../../../backEnd/utils/validations/UserSchema';
export default function EditProfile({ activeSection }) {
  const { setErrorHandler, updateUserData, userData } =
    useContext(SessionContext);

  //----------- normaliam erroru atvaizdavimui skirta consta// naudojama ant textfieldu kartu su snackbaru
  const fieldLabels = {
    email: 'Email',
    phoneNumber: 'Phone Number',
    address: 'Address',
    postCode: 'Post Code',
  };
  //-----------------------------------------------------------
  //Steitas sekti formos duomenis del pakeitimu, palei
  const [formValues, setFormValues] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    postCode: '',
  });
  //-----------------------------------------------------------------
  // Steitas skirtas sekti kurie laukeliai buvo pakeisti, kurie buvo nepaliesti, palei tai siunciami i backa tik tie laukeliai kurie buvo editinti-pakeisti
  const [changedFields, setChangedFields] = useState({});
  //--------------------------------------------
  //----------------- useEffect'as skirtas uzpildyti inputu laukus, pasikeitus useData'ai// pakitus userData'ai useEffect'as atnaujina inputu value
  useEffect(() => {
    if (activeSection === 'editProfile') {
      setFormValues({
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        postCode: userData.postCode || '',
      });
      setChangedFields({});
    }
  }, [activeSection, userData]);
  //-------------------------------------------------------------
  //---------------Funkcija skirta nauju ivesciu reiksmems nustatyti. Dirba kartu su setFormValues, ir setChangedFields
  //-----DETALESNIS PAAISKINIMAS: inpute onChange={handleInputChange("email")} paleidziam sia funkcija. Passinam inputo name siuo atveju email
  //---setformvalues pame buvusia reiksme, isspredina ir prideda nauja reiksme(kuri buvo ivesta inpute) [field] yra inputo name, šiuo atveju "key'us"
  const handleInputChange = (field) => (e) => {
    const newValue = e.target.value;
    setFormValues((prev) => ({ ...prev, [field]: newValue }));

    setChangedFields((prev) => ({ ...prev, [field]: true }));
  };
  //-------------------------------------------------------

  //---------FORMOS FUNKCIJA
  async function editProfile(e) {
    e.preventDefault();

    //funkcija neleidzianti updatinti datos jeigu laukeliai nera pakeisti (grazina ture arba false//)
    const noChanges = Object.keys(formValues).every(
      (key) => formValues[key] === userData[key]
    );
    if (noChanges) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Cant change field into same value.',
        alertColor: 'error',
      });

      return;
    }
    //-------------------------

    //-------Funkcija skirta sukurti objektui kuris bus siunciamas i backend'a
    //---Detalesnis paaiskinimas::: --- acc(akumuliatorius) sudaro objekta is [key] : true/false - jeigu [key]: false. inputo dabartine reiksme nera pakitusi vadinasi
    // objektas netures to laukelio kuri siustu i backend. pvz phoneNumber: false, vadinasi phone number nebuvo pakeistas , tai reiskia jis nebus siunciamas i backend.
    //taip ife tikrinam ar keisti laukai yra true. jei true suformuojamas objektas kuris bus siunciamas i back'a
    const updatingData = Object.keys(changedFields).reduce((acc, key) => {
      if (changedFields[key]) {
        acc[key] = formValues[key];
      }
      return acc;
    }, {});
    //--------------------------------------\
    //---Tikrinimas ar nors vienas laukelis buvo editinamas
    if (Object.keys(updatingData).length === 0) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Please edit atleast one field, to make changes.',
        alertColor: 'error',
      });

      return;
    }
    //---------------------------
    //---------ZOD VALIDACIJOS-------------
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
    //--- PAPILDOMAS TIKRINIMAS PRIEš SIUNČIANT (OPTIONAL)---------
    if (validatedData.error) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: errMessage,
        alertColor: 'error',
      });
      return;
    }
    //--------------------------------------------
    try {
      const promise = await fetch('/server/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatingData),
      });

      if (promise.ok) {
        const response = await promise.json();

        const updatedFields = response.updatedFields;

        // SITA FUNKCIJA RANDASI APP.JSX ji skirta atnaujinti iškarto informacijai po submito
        updateUserData(updatedFields);
        //Kartu atnaujinami input fieldai
        setFormValues((prev) => ({
          ...prev,
          ...updatedFields,
        }));
        setChangedFields({});
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: Object.keys(updatingData)
            .map((field) => `${fieldLabels[field]} was updated!`)
            .join('. '),
          alertColor: 'success',
        });
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: errMessage,
          alertColor: 'error',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'An error occurred. Please try again.',
        alertColor: 'error',
      });
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
