import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Dashboard from './pages/Dashboard';
import UserPanel from './pages/UsuerPanel';

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
    </BrowserRouter>
  );
}

export default App;
