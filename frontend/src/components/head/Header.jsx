import { Bell, Search, User } from "lucide-react"
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <h1 className="header__title">Dashboard</h1>
        </div>

        <div className="header__right">
          {/* Search */}
          <div className="header__search">
            <Search className="header__search-icon" />
            <input type="text" placeholder="Buscar..." className="header__search-input" />
          </div>

          {/* Notifications */}
          <button className="header__notification">
            <Bell className="header__notification-icon" />
            <span className="header__notification-badge"></span>
          </button>

          {/* User Profile */}
          <button className="header__profile">
            <div className="header__avatar">
              <User className="header__avatar-icon" />
            </div>
            <span className="header__username">Usuario</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
