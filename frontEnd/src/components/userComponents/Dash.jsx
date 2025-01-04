import { useEffect, useState } from 'react';

export default function Dash({ activeSection }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch(
          'http://localhost/server/api/users/session',
          {
            credentials: 'include', // Include cookies in the request
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    getUserData();
  }, []);

  return (
    <>
      {activeSection === 'dashboard' && (
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      )}
    </>
  );
}
