import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import UserPanel from './pages/UserPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/user"
          element={<UserPanel />}
        />
      </Routes>
      <Routes>
        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
