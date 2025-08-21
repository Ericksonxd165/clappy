import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, createContext, useContext , useEffect} from 'react'
import { getCurrentUser } from './api/users.api'

// Client Pages
import ClientDashboard from './pages/client/Dashboard'
import ClientPayment from './pages/client/Payment'
import ClientProfile from './pages/client/Profile'
import ClientLogin from './pages/client/Login'
import ClientRegister from './pages/client/Register'
import PaymentHistory from "./pages/client/PaymentHistory"
import ClientForgotPassword from './pages/client/ForgotPassword'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminPaymentsList from './pages/admin/PaymentsList'
import AdminStock from './pages/admin/Stock'
import UserManagement from './pages/admin/UserManagement'
import AdminSupportConfig from './pages/admin/SupportConfig'
import AdminLayout from './components/layout/AdminLayout'
import ClientLayout from './components/layout/ClientLayout'

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
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate()

  // Fetch user data on initial load if tokens exist
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access');
      console.log("Checking auth. Access token:", accessToken);
      if (accessToken) {
        try {
          const res = await getCurrentUser();
          console.log("getCurrentUser successful. User data:", res.data);
          login(res.data);
        } catch (error) {
          console.error("Error fetching current user:", error);
          logout(); // Clear invalid tokens
        } finally {
          setLoading(false); // Set loading to false after checkAuth completes
        }
      } else {
        setLoading(false); // No token, so not loading
      }
    };
    checkAuth();
  }, []); // Run only once on mount

  const login = (userData) => {
    console.log("Login called with user data:", userData);
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    console.log("Logout called.");
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate('/login')
  }

  const PrivateRoute = ({ children, adminOnly, clientOnly }) => {
    console.log("PrivateRoute check. isAuthenticated:", isAuthenticated, "user:", user, "adminOnly:", adminOnly, "clientOnly:", clientOnly);
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login.");
      return <Navigate to="/login" replace />;
    }

    if (adminOnly && (!user || !user.is_staff)) {
      console.log("Authenticated but not admin, redirecting to dashboard.");
      return <Navigate to="/dashboard" replace />;
    }

    if (clientOnly && user && user.is_staff) {
      console.log("Admin trying to access client route, redirecting to admin dashboard.");
      return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
  };

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<ClientLogin />} />
            <Route path="/register" element={<ClientRegister />} />
            <Route path="/forgot-password" element={<ClientForgotPassword />} />
            
            {/* Client Routes */}
            <Route path="/" element={<PrivateRoute clientOnly><ClientLayout /></PrivateRoute>}>
                <Route path="dashboard" element={<ClientDashboard />} />
                <Route path="payment" element={<ClientPayment />} />
                <Route path="profile" element={<ClientProfile />} />
                <Route path="payment-history" element={<PaymentHistory />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="payments" element={<AdminPaymentsList />} />
                <Route path="stock" element={<AdminStock />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="support" element={<AdminSupportConfig />} />
            </Route>
            
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
