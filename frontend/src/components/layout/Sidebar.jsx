import { useState, useEffect} from 'react'
import { Home, CreditCard, User, Package, Users, BarChart3, X } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import "./stlyingresponsive.css"


const Sidebar = ({ isOpen, onClose, isAdmin = false }) => {
  const location = useLocation()

  // Bloquear scroll del body cuando la sidebar está abierta (solo en móvil)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const clientMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Realizar Pago', path: '/payment' },
    { icon: BarChart3, label: 'Historial de Pagos', path: '/payment-history' },
  ]

  const adminMenuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: CreditCard, label: 'Lista de Pagos', path: '/admin/payments' },
    { icon: Package, label: 'Gestión de Cajas', path: '/admin/stock' },
    { icon: Users, label: 'Gestión de Usuarios', path: '/admin/users' },
  ]

  const menuItems = isAdmin ? adminMenuItems : clientMenuItems

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
   <div className={`
  absolute left-0 top-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  sm:fixed sm:h-120 
  lg:translate-x-0 lg:static lg:h-auto lg:z-auto    idkwtfisthis
`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <span className="font-bold">Clappy</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200
                      ${isActive 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            © 2024 Caja Clap System
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
