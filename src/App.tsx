/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import BusinessForm from "./components/business/BusinessForm"
import Dashboard from "./components/dashboard/Dashboard"
import Settings from "./components/settings/Settings"
import Layout from "./components/layout/Layout"
import { useAuth } from "./context/AuthContext"

export default function App() {
  const { loading, user } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/business-form" />}
        />
        <Route
          path="/business-form"
          element={user ? <BusinessForm /> : <Navigate to="/login" />}
        />
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}
