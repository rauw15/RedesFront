// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <h1>Mi Aplicación</h1>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
