import { TextField } from '@mui/material';
import Nav from '../components/Navigation';
import { useState } from 'react';
import HistoryTable from '../components/userComponents/HistoryTable';
import Menu from '../components/userComponents/Menu';
import Greeting from '../components/userComponents/Greeting';
import EditProfile from '../components/userComponents/EditProfile';
import ChangePassword from '../components/userComponents/ChangePassword';
import UserDashboard from '../components/userComponents/UserDashboard';

export default function UserPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');

  function handleSection(section) {
    setActiveSection(section);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Nav />

          <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-10">
            <div className="col-span-2 row-span-5 bg-gray-900 p-4 rounded shadow">
              <Menu
                activeSection={activeSection}
                handleSection={handleSection}
              />
            </div>

            <Greeting />

            <div className="col-span-3 row-span-4 col-start-3 row-start-2 bg-white p-6 rounded shadow">
              <UserDashboard activeSection={activeSection} />

              <EditProfile activeSection={activeSection} />
              <ChangePassword activeSection={activeSection} />

              {activeSection === 'purchaseHistory' && (
                <div>
                  <HistoryTable />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
