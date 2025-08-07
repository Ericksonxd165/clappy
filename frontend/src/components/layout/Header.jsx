import { useState } from 'react'
import { Menu, X, User, LogOut, Bell } from 'lucide-react'
import { useAuth } from '../../App'

const Header = ({ onMenuToggle, isAdmin = false }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-lg border-b-2 border-red-600">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Clappy {isAdmin && <span className="text-red-600">Admin</span>}
            </h1>
          </div>
        </div>

        {/* Right side - Notifications and User menu */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name || 'Usuario'}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mi Perfil
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="inline h-4 w-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
