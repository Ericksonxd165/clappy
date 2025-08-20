import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { Package, DollarSign, CheckCircle, Clock, CreditCard, User, Bell } from 'lucide-react'
import { getCaja, getCajasPersona, getNotifications } from '../../api/box.api'

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    availableBoxes: "--",
    boxPrice: "--",
  })
  const [userPayments, setUserPayments] = useState({
    availableBoxes: "--",
    boxPrice: "--",
  })
  const [notifications, setNotifications] = useState([])

  const userPaymentStatus = userPayments.length > 0
    ? (userPayments[0].status === 'APPROVED' ? 'paid' : 'pending')
    : 'unpaid';



  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const cajaRes = await getCaja()
        if (cajaRes.data.length > 0) {
          setDashboardData({
            availableBoxes: cajaRes.data[0].stock,
            boxPrice: cajaRes.data[0].price,
          })
        }

        const paymentsRes = await getCajasPersona()
        setUserPayments(paymentsRes.data)

        const notificationsRes = await getNotifications()
        setNotifications(notificationsRes.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchInfo()
  }, [])

 
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">¡Bienvenido a Clappy!</h1>
        <p className="text-red-100">Gestiona tus pagos de caja clap de manera fácil y segura</p>
      </div>

      {/* Stats Cards */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cajas Disponibles</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.availableBoxes}</p>
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
                <p className="text-2xl font-bold text-gray-900">${dashboardData.boxPrice}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>

          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${
                userPaymentStatus === 'paid' ? 'bg-green-100' :
                userPaymentStatus === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
              }`}>
                {userPaymentStatus === 'paid' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Clock className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Estado de Pago</p>
                <p className={`text-sm font-bold ${
                  userPaymentStatus === 'paid' ? 'text-green-600' :
                  userPaymentStatus === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {userPaymentStatus === 'paid' ? 'Pagado' :
                   userPaymentStatus === 'pending' ? 'Pendiente' : 'Sin Pago'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estado de tu Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentStatus payments={userPayments} />
          </CardContent>
        </Card>

        <NotificationPanel notifications={notifications} />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Realizar Pago
            </Button>
            <Button variant="outline" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Ver Perfil
            </Button>
            <Button variant="ghost" className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Historial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
) }

const PaymentStatus = ({ payments }) => {
  const lastPayment = payments.length > 0 ? payments[payments.length - 1] : null;

  if (!lastPayment) {
    return (
      <div className="text-center py-6">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Sin Pagos Realizados</h3>
        <p className="text-gray-600 mb-4">Aún no has realizado ningún pago</p>
        <Button className="w-full" onClick={() => window.location.href = '/client/payment'}>
          Realizar Primer Pago
        </Button>
      </div>
    );
  }

  const statusConfig = {
    PENDING: {
      icon: <Clock className="h-16 w-16 text-yellow-600 mx-auto mb-4" />,
      title: "Pago Pendiente",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Tu pago está siendo procesado. Tiempo estimado de confirmación: 24-48 horas.",
    },
    APPROVED: {
      icon: <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />,
      title: "¡Pago Confirmado!",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      description: "Tu pago ha sido procesado exitosamente.",
    },
    REJECTED: {
      icon: <CheckCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />,
      title: "Pago Rechazado",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      description: "Tu pago ha sido rechazado. Por favor, contacta a soporte.",
    },
  };

  const config = statusConfig[lastPayment.status] || statusConfig.PENDING;

  return (
    <div className="text-center py-6">
      {config.icon}
      <h3 className={`text-lg font-semibold ${config.textColor} mb-2`}>{config.title}</h3>
      <div className={`${config.bgColor} p-4 rounded-lg`}>
        <p className={`text-sm ${config.textColor}`}>{config.description}</p>
      </div>
    </div>
  );
};

const NotificationPanel = ({ notifications }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-gray-100' : 'bg-red-50'}`}>
                <p className={`text-sm ${notif.read ? 'text-gray-600' : 'text-red-800'}`}>{notif.message}</p>
                <p className={`text-xs text-right ${notif.read ? 'text-gray-500' : 'text-red-500'}`}>
                  {new Date(notif.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No tienes notificaciones nuevas.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDashboard;
