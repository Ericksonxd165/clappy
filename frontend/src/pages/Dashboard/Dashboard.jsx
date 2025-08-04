import { DollarSign, ArrowUpRight, ArrowDownRight, Users, TrendingUp } from "lucide-react"
import "./Dashboard.css"

const Dashboard = () => {
  const stats = [
    {
      title: "Saldo Disponible",
      value: "$12,345.67",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Transferencias Realizadas",
      value: "156",
      change: "+8.2%",
      changeType: "positive",
      icon: ArrowUpRight,
    },
    {
      title: "Pagos Pendientes",
      value: "23",
      change: "-4.1%",
      changeType: "negative",
      icon: ArrowDownRight,
    },
    {
      title: "Usuarios Activos",
      value: "1,234",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
    },
  ]

  const recentTransactions = [
    { id: 1, description: "Transferencia a Juan Pérez", amount: "-$500.00", date: "2024-01-15", status: "Completada" },
    { id: 2, description: "Depósito bancario", amount: "+$1,200.00", date: "2024-01-14", status: "Completada" },
    { id: 3, description: "Pago de servicios", amount: "-$85.50", date: "2024-01-13", status: "Pendiente" },
    { id: 4, description: "Transferencia recibida", amount: "+$750.00", date: "2024-01-12", status: "Completada" },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard Principal</h1>
        <p className="dashboard__subtitle">Bienvenido de vuelta, aquí tienes un resumen de tu actividad</p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="dashboard__stat-card">
              <div className="dashboard__stat-content">
                <div className="dashboard__stat-info">
                  <p className="dashboard__stat-label">{stat.title}</p>
                  <p className="dashboard__stat-value">{stat.value}</p>
                </div>
                <div className="dashboard__stat-icon">
                  <Icon className="dashboard__stat-icon-svg" />
                </div>
              </div>
              <div className="dashboard__stat-change">
                <TrendingUp
                  className={`dashboard__stat-trend ${stat.changeType === "positive" ? "dashboard__stat-trend--positive" : "dashboard__stat-trend--negative"}`}
                />
                <span
                  className={`dashboard__stat-change-value ${stat.changeType === "positive" ? "dashboard__stat-change-value--positive" : "dashboard__stat-change-value--negative"}`}
                >
                  {stat.change}
                </span>
                <span className="dashboard__stat-change-label">vs mes anterior</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Transactions */}
      <div className="dashboard__transactions">
        <div className="dashboard__transactions-header">
          <h2 className="dashboard__transactions-title">Transacciones Recientes</h2>
          <button className="dashboard__transactions-button">Ver todas</button>
        </div>

        <div className="dashboard__table-container">
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th className="dashboard__table-hidden-sm">Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="dashboard__table-description">{transaction.description}</td>
                  <td
                    className={`dashboard__table-amount ${transaction.amount.startsWith("+") ? "dashboard__table-amount--positive" : "dashboard__table-amount--negative"}`}
                  >
                    {transaction.amount}
                  </td>
                  <td className="dashboard__table-hidden-sm dashboard__table-date">{transaction.date}</td>
                  <td>
                    <span
                      className={`dashboard__status ${transaction.status === "Completada" ? "dashboard__status--completed" : "dashboard__status--pending"}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard__actions">
        <div className="dashboard__action-card">
          <h3 className="dashboard__action-title">Nueva Transferencia</h3>
          <p className="dashboard__action-description">Envía dinero de forma rápida y segura</p>
          <button className="dashboard__action-button dashboard__action-button--primary">Transferir</button>
        </div>

        <div className="dashboard__action-card">
          <h3 className="dashboard__action-title">Pagar Servicios</h3>
          <p className="dashboard__action-description">Paga tus servicios básicos aquí</p>
          <button className="dashboard__action-button dashboard__action-button--secondary">Pagar</button>
        </div>

        <div className="dashboard__action-card">
          <h3 className="dashboard__action-title">Ver Reportes</h3>
          <p className="dashboard__action-description">Consulta tus reportes financieros</p>
          <button className="dashboard__action-button dashboard__action-button--secondary">Ver Reportes</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
