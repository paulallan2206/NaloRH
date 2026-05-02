import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing  from './pages/Landing'
import Analyser from './pages/Analyser'
import Dashboard from './pages/Dashboard'
import Rapport   from './pages/Rapport'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/analyser"  element={<Analyser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rapport"   element={<Rapport />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
