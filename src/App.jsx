import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginSignUpPage from './Pages/auth/LoginSignUp.jsx'
import AdminHomePage from './Pages/admin/AdminHomePage.jsx'
import { ThemeProvider } from 'react-bootstrap';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignUpPage />}/>
        <Route path="/admin" element={<AdminHomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
