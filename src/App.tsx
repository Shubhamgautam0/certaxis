import { useState } from 'react'
import './App.css';
import AppRoutes from './routing/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';


function App() {

  return (
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
  )
}

export default App
