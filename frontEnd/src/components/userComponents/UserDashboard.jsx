import { useContext, useEffect, useState } from 'react';
import SessionContext from '../../context/SessionContext.js';

export default function UserDashboard({ activeSection }) {
  const { userData } = useContext(SessionContext);

  console.log(userData);

  return (
    <>
      {activeSection === 'dashboard' && (
        <div>
          <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
          <ul>
            <li>
              Name: {userData.firstName} {userData.lastName}
            </li>

            <li>Email: {userData.email}</li>
            <li>
              Address:{' '}
              {userData.address === null
                ? 'You havent added your address'
                : userData.address}
            </li>
            <li>
              Phone:{' '}
              {userData.phoneNumber === null
                ? 'You havent added your phone number'
                : userData.phoneNumber}
            </li>
            <li>
              Post Code:{' '}
              {userData.postCode === null
                ? 'You havent added your phone number'
                : userData.postCode}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
