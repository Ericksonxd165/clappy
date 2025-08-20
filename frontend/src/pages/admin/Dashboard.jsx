import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { Package, DollarSign, CheckCircle, Clock ,CreditCard, User, TrendingUp, Users } from 'lucide-react'
import { getCaja, getCajasPersona } from '../../api/box.api'

const AdminDashboard = () => {
  const [caja, setCaja] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [cajaRes, paymentsRes] = await Promise.all([
          getCaja(),
          getCajasPersona()
        ])

        if (cajaRes.data.length > 0) {
          setCaja(cajaRes.data[0])
        } else {
          setError('No se encontró la entidad de caja. Por favor, crea una en la sección de Stock.')
        }
        setPayments(paymentsRes.data)
      } catch (err) {
        setError('Error al cargar los datos del dashboard.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Calculate statistics
  const totalSoldBoxes = payments.filter(p => p.status === 'APPROVED' || p.delivered).length;
  const totalRevenue = payments.reduce((sum, p) => {
    if (p.status === 'APPROVED' || p.delivered) {
      return sum + parseFloat(p.amount);
    }
    return sum;
  }, 0).toFixed(2);
  const pendingPayments = payments.filter(p => p.status === 'PENDING').length;
  const deliveredBoxes = payments.filter(p => p.delivered).length;
  const totalUsers = new Set(payments.map(p => p.user.id)).size; // Assuming user.id is unique

  if (loading) {
    return <Layout isAdmin={true}><div className="text-center p-8">Cargando datos del Dashboard...</div></Layout>
  }

  if (error) {
    return <Layout isAdmin={true}><div className="text-center p-8 text-red-600">{error}</div></Layout>
  }

  return (
    <Layout isAdmin={true}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido, Administrador!</h1>
          <p className="text-red-100">Resumen general de la gestión de cajas Clap</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Actual</p>
                  <p className="text-2xl font-bold text-gray-900">{caja ? caja.stock : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Precio por Caja</p>
                  <p className="text-2xl font-bold text-gray-900">${caja ? caja.price : 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cajas Vendidas</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSoldBoxes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pagos Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cajas Entregadas</p>
                  <p className="text-2xl font-bold text-gray-900">{deliveredBoxes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions (Admin specific) */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="w-full" onClick={() => window.location.href = '/admin/stock'}>
                <Package className="h-4 w-4 mr-2" />
                Gestionar Stock
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/payments'}>
                <CreditCard className="h-4 w-4 mr-2" />
                Ver Pagos
              </Button>
              <Button variant="ghost" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Gestionar Usuarios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default AdminDashboard