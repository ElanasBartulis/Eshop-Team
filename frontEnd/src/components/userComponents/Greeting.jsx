import { useContext } from 'react';
import SessionContext from '../../context/SessionContext';

export default function Greeting() {
  const { userData } = useContext(SessionContext);

  return (
    <div className="col-span-3 col-start-3 bg-gray-900 p-6 rounded shadow flex items-center justify-center">
      <h2 className="text-gray-50 text-2xl font-bold">
        Hello {userData.firstName}!
      </h2>
    </div>
  );
}
