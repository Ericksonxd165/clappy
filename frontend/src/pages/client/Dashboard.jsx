import { useState, useEffect } from 'react'
import Uilayout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { Package, DollarSign, CheckCircle, Clock, CreditCard, User} from 'lucide-react'

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    availableBoxes: 25,
    boxPrice: 150,
    userPaymentStatus: 'pending', // 'paid', 'pending', 'none'
    userBoxes: 2
  })

  return (
    <Uilayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido a Clappy!</h1>
          <p className="text-red-100">Gestiona tus pagos de caja clap de manera fácil y segura</p>
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
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Mis Cajas</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.userBoxes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  dashboardData.userPaymentStatus === 'paid' ? 'bg-green-100' : 
                  dashboardData.userPaymentStatus === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  {dashboardData.userPaymentStatus === 'paid' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Clock className="h-6 w-6 text-yellow-600" />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estado de Pago</p>
                  <p className={`text-sm font-bold ${
                    dashboardData.userPaymentStatus === 'paid' ? 'text-green-600' : 
                    dashboardData.userPaymentStatus === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {dashboardData.userPaymentStatus === 'paid' ? 'Pagado' : 
                     dashboardData.userPaymentStatus === 'pending' ? 'Pendiente' : 'Sin Pago'}
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
              {dashboardData.userPaymentStatus === 'paid' ? (
                <div className="text-center py-6">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-600 mb-2">¡Pago Confirmado!</h3>
                  <p className="text-gray-600 mb-4">Tu pago ha sido procesado exitosamente</p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Cajas pagadas:</strong> {dashboardData.userBoxes}<br />
                      <strong>Total pagado:</strong> ${dashboardData.userBoxes * dashboardData.boxPrice}
                    </p>
                  </div>
                </div>
              ) : dashboardData.userPaymentStatus === 'pending' ? (
                <div className="text-center py-6">
                  <Clock className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-600 mb-2">Pago Pendiente</h3>
                  <p className="text-gray-600 mb-4">Tu pago está siendo procesado</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Tiempo estimado de confirmación: 24-48 horas
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Sin Pagos Realizados</h3>
                  <p className="text-gray-600 mb-4">Aún no has realizado ningún pago</p>
                  <Button className="w-full">
                    Realizar Primer Pago
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Cajas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Precio por Caja</p>
                    <p className="text-sm text-gray-600">Precio actual del mercado</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">${dashboardData.boxPrice}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Cajas Disponibles</p>
                    <p className="text-sm text-gray-600">Stock actual</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{dashboardData.availableBoxes}</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Ver Detalles de Pago
                </Button>
              </div>
            </CardContent>
          </Card>
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
    </Uilayout>
  )
}

export default ClientDashboard
