import { useContext, useEffect, useState } from 'react';
import SessionContext from '../../context/SessionContext.js';

export default function UserDashboard({ activeSection }) {
  const { userData } = useContext(SessionContext);

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
              Address: {userData.address || 'You havent added your address'}
            </li>
            <li>
              Phone:{' '}
              {userData.phoneNumber || 'You havent added your phone number'}
            </li>
            <li>
              Post Code:{' '}
              {userData.postCode || 'You havent added your phone number'}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
