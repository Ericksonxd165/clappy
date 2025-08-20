import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'

// Client Pages
import ClientDashboard from './pages/client/Dashboard'
import ClientPayment from './pages/client/Payment'
import ClientProfile from './pages/client/Profile'
import ClientLogin from './pages/client/Login'
import ClientRegister from './pages/client/Register'
import ClientForgotPassword from './pages/client/ForgotPassword'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminPaymentsList from './pages/admin/PaymentsList'
import AdminStock from './pages/admin/Stock'

// Context for authentication
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const AppContent = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate('/login')
  }

  const PrivateRoute = ({ children, adminOnly }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (adminOnly && (!user || !user.is_staff)) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<ClientLogin />} />
            <Route path="/register" element={<ClientRegister />} />
            <Route path="/forgot-password" element={<ClientForgotPassword />} />
            
            {/* Client Routes */}
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/payment" element={<ClientPayment />} />
            <Route path="/profile" element={<ClientProfile />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute adminOnly><AdminPaymentsList /></PrivateRoute>} />
            <Route path="/admin/stock" element={<PrivateRoute adminOnly><AdminStock /></PrivateRoute>} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      
    </AuthContext.Provider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
