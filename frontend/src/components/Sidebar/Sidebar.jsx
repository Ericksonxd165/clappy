"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Home, Table, FileText, BarChart3, Menu, X } from "lucide-react"
import "./Sidebar.css"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
  { id: "tables", label: "Tablas", icon: Table, path: "/tables" },
  { id: "forms", label: "Formularios", icon: FileText, path: "/forms" },
  { id: "analytics", label: "Analíticas", icon: BarChart3, path: "/analytics" },
]

const Sidebar = ({ currentPath }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && <div className="sidebar__overlay" onClick={() => setIsMobileOpen(false)} />}

      {/* Mobile menu button */}
      <button className="sidebar__mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X className="sidebar__mobile-icon" /> : <Menu className="sidebar__mobile-icon" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""} ${isMobileOpen ? "sidebar--mobile-open" : ""}`}
      >
        <div className="sidebar__content">
          {/* Logo and toggle */}
          <div className="sidebar__header">
            {!isCollapsed && <h2 className="sidebar__logo">Mi App</h2>}
            <button className="sidebar__toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
              <Menu className="sidebar__toggle-icon" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="sidebar__nav">
            <ul className="sidebar__menu">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPath === item.path

                return (
                  <li key={item.id} className="sidebar__menu-item">
                    <Link
                      to={item.path}
                      className={`sidebar__menu-link ${isActive ? "sidebar__menu-link--active" : ""}`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Icon className="sidebar__menu-icon" />
                      {!isCollapsed && <span className="sidebar__menu-label">{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="sidebar__footer">
              <div className="sidebar__footer-text">© 2024 Mi Dashboard</div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
