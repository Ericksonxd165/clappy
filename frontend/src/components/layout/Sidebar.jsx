import { useState, useEffect} from 'react'
import { Home, CreditCard, User, Package, Users, BarChart3, X, Settings, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import "./stlyingresponsive.css"


const Sidebar = ({ isOpen, onClose, isAdmin = false, isCollapsed, onToggleCollapse }) => {
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
    { icon: Settings, label: 'Soporte', path: '/admin/support' },
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
        fixed left-0 top-0 bg-gray-900 text-white h-screen transform transition-all duration-300 ease-in-out z-50
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b border-gray-700 h-16 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            <div className="flex items-center overflow-hidden">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">CL</span>
                </div>
                <span className={`font-bold whitespace-nowrap ml-2 ${isCollapsed ? 'hidden' : 'inline'}`}>Clappy</span>
            </div>
            
            <div>
                <button
                    onClick={onToggleCollapse}
                    className="hidden lg:block p-1 rounded-md hover:bg-gray-700"
                    title={isCollapsed ? 'Expandir' : 'Contraer'}
                >
                    {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>
                <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-gray-700 lg:hidden"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
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
                    title={isCollapsed ? item.label : ''}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className={`whitespace-nowrap ${isCollapsed ? 'hidden' : 'inline'}`}>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <div className={`text-xs text-gray-400 text-center whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>
                © 2024 Caja Clap
            </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
