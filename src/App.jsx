import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import VerifyOTP from './pages/VerifyOTP'
import Dashboard from './pages/Dashboard'
import { ArtistProvider } from './context/ArtistContext'

function App() {
  return (
    <ArtistProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ArtistProvider>
  )
}

export default App
