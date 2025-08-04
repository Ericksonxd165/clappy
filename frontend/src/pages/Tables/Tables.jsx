"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"
import "./Tables.css"

const Tables = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Datos de ejemplo
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Usuario ${i + 1}`,
    email: `usuario${i + 1}@email.com`,
    role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Editor" : "Usuario",
    status: i % 4 === 0 ? "Inactivo" : "Activo",
    lastLogin: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    transactions: Math.floor(Math.random() * 100) + 1,
    amount: `$${(Math.random() * 10000).toFixed(2)}`,
  }))

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="tables">
      <div className="tables__header">
        <h1 className="tables__title">Gestión de Tablas</h1>
        <p className="tables__subtitle">Administra y visualiza datos de forma eficiente</p>
      </div>

      {/* Filters and Actions */}
      <div className="tables__filters">
        <div className="tables__filters-left">
          <div className="tables__search">
            <Search className="tables__search-icon" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="tables__search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="tables__filter-button">
            <Filter className="tables__filter-icon" />
            Filtros
          </button>
        </div>

        <div className="tables__actions">
          <button className="tables__action-button tables__action-button--secondary">
            <Download className="tables__action-icon" />
            Exportar
          </button>
          <button className="tables__action-button tables__action-button--primary">Agregar Usuario</button>
        </div>
      </div>

      {/* Table */}
      <div className="tables__container">
        <div className="tables__table-wrapper">
          <table className="tables__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th className="tables__hidden-md">Email</th>
                <th className="tables__hidden-sm">Rol</th>
                <th>Estado</th>
                <th className="tables__hidden-lg">Último Login</th>
                <th className="tables__hidden-xl">Transacciones</th>
                <th className="tables__hidden-xl">Monto Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td className="tables__id">{item.id}</td>
                  <td className="tables__name">{item.name}</td>
                  <td className="tables__hidden-md tables__email">{item.email}</td>
                  <td className="tables__hidden-sm">
                    <span className={`tables__role tables__role--${item.role.toLowerCase()}`}>{item.role}</span>
                  </td>
                  <td>
                    <span className={`tables__status tables__status--${item.status.toLowerCase()}`}>{item.status}</span>
                  </td>
                  <td className="tables__hidden-lg tables__date">{item.lastLogin}</td>
                  <td className="tables__hidden-xl tables__transactions">{item.transactions}</td>
                  <td className="tables__hidden-xl tables__amount">{item.amount}</td>
                  <td>
                    <div className="tables__row-actions">
                      <button className="tables__row-action">
                        <Eye className="tables__row-action-icon" />
                      </button>
                      <button className="tables__row-action">
                        <Edit className="tables__row-action-icon tables__row-action-icon--edit" />
                      </button>
                      <button className="tables__row-action">
                        <Trash2 className="tables__row-action-icon tables__row-action-icon--delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="tables__pagination">
          <div className="tables__pagination-info">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de{" "}
            {filteredData.length} resultados
          </div>

          <div className="tables__pagination-controls">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="tables__pagination-button"
            >
              Anterior
            </button>

            <div className="tables__pagination-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`tables__pagination-number ${currentPage === page ? "tables__pagination-number--active" : ""}`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="tables__pagination-button"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tables
