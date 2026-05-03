import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyPropertiesPage from './pages/MyPropertiesPage'
import PropertyFormPage from './pages/PropertyFormPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-properties" element={<MyPropertiesPage />} />
        <Route path="/my-properties/new" element={<PropertyFormPage />} />
        <Route path="/my-properties/:id/edit" element={<PropertyFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
