import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target } from "lucide-react"
import "./Analytics.css"

const Analytics = () => {
  // Datos falsos para los gráficos
  const monthlyData = [
    { month: "Ene", revenue: 4000, users: 240, transactions: 120 },
    { month: "Feb", revenue: 3000, users: 139, transactions: 98 },
    { month: "Mar", revenue: 2000, users: 980, transactions: 180 },
    { month: "Abr", revenue: 2780, users: 390, transactions: 156 },
    { month: "May", revenue: 1890, users: 480, transactions: 201 },
    { month: "Jun", revenue: 2390, users: 380, transactions: 167 },
    { month: "Jul", revenue: 3490, users: 430, transactions: 189 },
  ]

  const kpis = [
    {
      title: "Ingresos Totales",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      description: "vs mes anterior",
    },
    {
      title: "Usuarios Activos",
      value: "2,350",
      change: "+180.1%",
      changeType: "positive",
      icon: Users,
      description: "vs mes anterior",
    },
    {
      title: "Tasa de Conversión",
      value: "12.5%",
      change: "-19%",
      changeType: "negative",
      icon: Target,
      description: "vs mes anterior",
    },
    {
      title: "Transacciones",
      value: "1,234",
      change: "+7%",
      changeType: "positive",
      icon: Activity,
      description: "vs mes anterior",
    },
  ]

  const topProducts = [
    { name: "Producto A", sales: 1234, revenue: "$12,345", growth: "+12%" },
    { name: "Producto B", sales: 987, revenue: "$9,876", growth: "+8%" },
    { name: "Producto C", sales: 756, revenue: "$7,560", growth: "-3%" },
    { name: "Producto D", sales: 543, revenue: "$5,430", growth: "+15%" },
    { name: "Producto E", sales: 321, revenue: "$3,210", growth: "+5%" },
  ]

  const recentActivity = [
    { action: "Nueva venta registrada", time: "Hace 2 minutos", type: "sale" },
    { action: "Usuario registrado", time: "Hace 5 minutos", type: "user" },
    { action: "Pago procesado", time: "Hace 8 minutos", type: "payment" },
    { action: "Reporte generado", time: "Hace 12 minutos", type: "report" },
    { action: "Configuración actualizada", time: "Hace 15 minutos", type: "config" },
  ]

  return (
    <div className="analytics">
      <div className="analytics__header">
        <h1 className="analytics__title">Analíticas y Estadísticas</h1>
        <div className="analytics__controls">
          <select className="analytics__select">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
          </select>
          <button className="analytics__export-button">Exportar</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="analytics__kpis">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="analytics__kpi-card">
              <div className="analytics__kpi-content">
                <div className="analytics__kpi-info">
                  <p className="analytics__kpi-label">{kpi.title}</p>
                  <p className="analytics__kpi-value">{kpi.value}</p>
                </div>
                <div className="analytics__kpi-icon">
                  <Icon className="analytics__kpi-icon-svg" />
                </div>
              </div>
              <div className="analytics__kpi-change">
                {kpi.changeType === "positive" ? (
                  <TrendingUp className="analytics__kpi-trend analytics__kpi-trend--positive" />
                ) : (
                  <TrendingDown className="analytics__kpi-trend analytics__kpi-trend--negative" />
                )}
                <span
                  className={`analytics__kpi-change-value ${kpi.changeType === "positive" ? "analytics__kpi-change-value--positive" : "analytics__kpi-change-value--negative"}`}
                >
                  {kpi.change}
                </span>
                <span className="analytics__kpi-change-label">{kpi.description}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="analytics__charts">
        {/* Revenue Chart */}
        <div className="analytics__chart-card">
          <h2 className="analytics__chart-title">Ingresos Mensuales</h2>
          <div className="analytics__chart analytics__chart--revenue">
            <div className="analytics__chart-overlay"></div>
            <div className="analytics__chart-content">
              <div className="analytics__chart-value">$45,231</div>
              <div className="analytics__chart-subtitle">Ingresos este mes</div>
              <div className="analytics__chart-data">
                {monthlyData.slice(-4).map((data, i) => (
                  <div key={i} className="analytics__chart-item">
                    <div className="analytics__chart-month">{data.month}</div>
                    <div className="analytics__chart-amount">${(data.revenue / 1000).toFixed(1)}k</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Chart */}
        <div className="analytics__chart-card">
          <h2 className="analytics__chart-title">Usuarios Activos</h2>
          <div className="analytics__chart analytics__chart--users">
            <div className="analytics__chart-overlay"></div>
            <div className="analytics__chart-content">
              <div className="analytics__chart-value">2,350</div>
              <div className="analytics__chart-subtitle">Usuarios este mes</div>
              <div className="analytics__chart-data analytics__chart-data--grid">
                {monthlyData.slice(-4).map((data, i) => (
                  <div key={i} className="analytics__chart-item">
                    <div className="analytics__chart-month">{data.month}</div>
                    <div className="analytics__chart-amount">{data.users}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics__content">
        {/* Top Products */}
        <div className="analytics__products">
          <h2 className="analytics__products-title">Productos Más Vendidos</h2>
          <div className="analytics__products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="analytics__product-item">
                <div className="analytics__product-info">
                  <div className="analytics__product-rank">{index + 1}</div>
                  <div className="analytics__product-details">
                    <div className="analytics__product-name">{product.name}</div>
                    <div className="analytics__product-sales">{product.sales} ventas</div>
                  </div>
                </div>
                <div className="analytics__product-metrics">
                  <div className="analytics__product-revenue">{product.revenue}</div>
                  <div
                    className={`analytics__product-growth ${product.growth.startsWith("+") ? "analytics__product-growth--positive" : "analytics__product-growth--negative"}`}
                  >
                    {product.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="analytics__activity">
          <h2 className="analytics__activity-title">Actividad Reciente</h2>
          <div className="analytics__activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="analytics__activity-item">
                <div className={`analytics__activity-dot analytics__activity-dot--${activity.type}`}></div>
                <div className="analytics__activity-content">
                  <p className="analytics__activity-action">{activity.action}</p>
                  <p className="analytics__activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="analytics__performance">
        <h2 className="analytics__performance-title">Métricas de Rendimiento</h2>
        <div className="analytics__performance-grid">
          <div className="analytics__performance-item">
            <div className="analytics__performance-circle analytics__performance-circle--satisfaction">85%</div>
            <h3 className="analytics__performance-label">Satisfacción del Cliente</h3>
            <p className="analytics__performance-description">Basado en 1,234 reseñas</p>
          </div>

          <div className="analytics__performance-item">
            <div className="analytics__performance-circle analytics__performance-circle--uptime">92%</div>
            <h3 className="analytics__performance-label">Tiempo de Actividad</h3>
            <p className="analytics__performance-description">Últimos 30 días</p>
          </div>

          <div className="analytics__performance-item">
            <div className="analytics__performance-circle analytics__performance-circle--efficiency">78%</div>
            <h3 className="analytics__performance-label">Eficiencia Operativa</h3>
            <p className="analytics__performance-description">Promedio mensual</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
