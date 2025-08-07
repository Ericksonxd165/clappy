import { useState } from 'react'
import Uilayout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { Package, DollarSign, Plus, Minus, Save, History, TrendingUp, AlertTriangle } from 'lucide-react'

const AdminStock = () => {
  const [stockData, setStockData] = useState({
    currentStock: 75,
    boxPrice: 150,
    totalSold: 25,
    revenue: 3750,
    lowStockAlert: 10
  })

  const [priceHistory, setPriceHistory] = useState([
    { date: '2024-01-01', price: 140, reason: 'Precio inicial' },
    { date: '2024-01-10', price: 145, reason: 'Ajuste por inflación' },
    { date: '2024-01-15', price: 150, reason: 'Precio actual' }
  ])

  const [stockHistory, setStockHistory] = useState([
    { date: '2024-01-20', type: 'sale', quantity: -2, remaining: 75, user: 'Juan Pérez' },
    { date: '2024-01-19', type: 'sale', quantity: -1, remaining: 77, user: 'María García' },
    { date: '2024-01-18', type: 'restock', quantity: +50, remaining: 78, user: 'Admin' },
    { date: '2024-01-17', type: 'sale', quantity: -3, remaining: 28, user: 'Carlos López' }
  ])

  const [newPrice, setNewPrice] = useState(stockData.boxPrice)
  const [stockAdjustment, setStockAdjustment] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState('')
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false)
  const [isUpdatingStock, setIsUpdatingStock] = useState(false)

  const handlePriceUpdate = async () => {
    if (newPrice <= 0) {
      alert('El precio debe ser mayor a 0')
      return
    }

    setIsUpdatingPrice(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update price
      setStockData(prev => ({ ...prev, boxPrice: newPrice }))
      
      // Add to price history
      setPriceHistory(prev => [
        ...prev,
        {
          date: new Date().toISOString().split('T')[0],
          price: newPrice,
          reason: adjustmentReason || 'Actualización de precio'
        }
      ])
      
      setAdjustmentReason('')
      alert('Precio actualizado exitosamente')
      
    } catch (error) {
      alert('Error al actualizar el precio')
    } finally {
      setIsUpdatingPrice(false)
    }
  }

  const handleStockUpdate = async () => {
    if (stockAdjustment === 0) {
      alert('Ingresa una cantidad para ajustar')
      return
    }

    const newStock = stockData.currentStock + stockAdjustment
    
    if (newStock < 0) {
      alert('No puedes tener stock negativo')
      return
    }

    setIsUpdatingStock(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update stock
      setStockData(prev => ({ ...prev, currentStock: newStock }))
      
      // Add to stock history
      setStockHistory(prev => [
        {
          date: new Date().toISOString().split('T')[0],
          type: stockAdjustment > 0 ? 'restock' : 'adjustment',
          quantity: stockAdjustment,
          remaining: newStock,
          user: 'Admin'
        },
        ...prev
      ])
      
      setStockAdjustment(0)
      setAdjustmentReason('')
      alert('Stock actualizado exitosamente')
      
    } catch (error) {
      alert('Error al actualizar el stock')
    } finally {
      setIsUpdatingStock(false)
    }
  }

  const getStockStatus = () => {
    if (stockData.currentStock <= stockData.lowStockAlert) {
      return { color: 'text-red-600', bg: 'bg-red-100', status: 'Stock Bajo' }
    } else if (stockData.currentStock <= stockData.lowStockAlert * 2) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Stock Medio' }
    } else {
      return { color: 'text-green-600', bg: 'bg-green-100', status: 'Stock Alto' }
    }
  }

  const stockStatus = getStockStatus()

  return (
    <Uilayout isAdmin={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Gestión de Stock</h1>
          <p className="text-red-100">Administra el inventario y precios de las cajas</p>
        </div>

        {/* Stock Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stockStatus.bg}`}>
                  <Package className={`h-6 w-6 ${stockStatus.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Actual</p>
                  <p className="text-2xl font-bold text-gray-900">{stockData.currentStock}</p>
                  <p className={`text-xs ${stockStatus.color}`}>{stockStatus.status}</p>
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
                  <p className="text-sm font-medium text-gray-600">Precio Actual</p>
                  <p className="text-2xl font-bold text-gray-900">${stockData.boxPrice}</p>
                  <p className="text-xs text-green-600">por caja</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stockData.totalSold}</p>
                  <p className="text-xs text-blue-600">este mes</p>
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
                  <p className="text-sm font-medium text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold text-gray-900">${stockData.revenue}</p>
                  <p className="text-xs text-purple-600">este mes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Alert */}
        {stockData.currentStock <= stockData.lowStockAlert && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">¡Stock Bajo!</h3>
                  <p className="text-sm text-red-700">
                    Solo quedan {stockData.currentStock} cajas. Considera reabastecer pronto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Management Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price Management */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Precios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio por Caja ($)
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      placeholder="150"
                      min="1"
                      step="0.01"
                    />
                    <Button
                      onClick={handlePriceUpdate}
                      disabled={isUpdatingPrice || newPrice === stockData.boxPrice}
                    >
                      {isUpdatingPrice ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Actualizando...
                        </div>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Actualizar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razón del Cambio (Opcional)
                  </label>
                  <textarea
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    placeholder="Ej: Ajuste por inflación, cambio de proveedor..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Price History Preview */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Último Cambio</h4>
                  {priceHistory.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <p><strong>Fecha:</strong> {priceHistory[priceHistory.length - 1].date}</p>
                      <p><strong>Precio:</strong> ${priceHistory[priceHistory.length - 1].price}</p>
                      <p><strong>Razón:</strong> {priceHistory[priceHistory.length - 1].reason}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock Management */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ajustar Stock
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setStockAdjustment(prev => prev - 1)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <Input
                      type="number"
                      value={stockAdjustment}
                      onChange={(e) => setStockAdjustment(Number(e.target.value))}
                      placeholder="0"
                      className="text-center"
                    />
                    
                    <button
                      onClick={() => setStockAdjustment(prev => prev + 1)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2">
                    Stock resultante: {stockData.currentStock + stockAdjustment}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razón del Ajuste
                  </label>
                  <textarea
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    placeholder="Ej: Reabastecimiento, corrección de inventario..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <Button
                  onClick={handleStockUpdate}
                  disabled={isUpdatingStock || stockAdjustment === 0}
                  className="w-full"
                >
                  {isUpdatingStock ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Actualizando...
                    </div>
                  ) : (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      Actualizar Stock
                    </>
                  )}
                </Button>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStockAdjustment(10)}
                  >
                    +10 Cajas
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStockAdjustment(25)}
                  >
                    +25 Cajas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Historial de Precios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceHistory.slice(-5).reverse().map((entry, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">${entry.price}</p>
                      <p className="text-sm text-gray-600">{entry.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                Historial de Movimientos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stockHistory.slice(0, 5).map((entry, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1 rounded-full ${
                        entry.type === 'sale' ? 'bg-red-100' :
                        entry.type === 'restock' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {entry.type === 'sale' ? (
                          <Minus className={`h-3 w-3 ${
                            entry.type === 'sale' ? 'text-red-600' :
                            entry.type === 'restock' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        ) : (
                          <Plus className={`h-3 w-3 ${
                            entry.type === 'sale' ? 'text-red-600' :
                            entry.type === 'restock' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.quantity > 0 ? '+' : ''}{entry.quantity} cajas
                        </p>
                        <p className="text-sm text-gray-600">
                          {entry.type === 'sale' ? `Venta - ${entry.user}` :
                           entry.type === 'restock' ? 'Reabastecimiento' : 'Ajuste manual'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Stock: {entry.remaining}</p>
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alerta de Stock Bajo (cantidad mínima)
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={stockData.lowStockAlert}
                    onChange={(e) => setStockData(prev => ({ ...prev, lowStockAlert: Number(e.target.value) }))}
                    min="1"
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600">
                    Se mostrará una alerta cuando el stock sea igual o menor a esta cantidad
                  </span>
                </div>
              </div>
              
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Uilayout>
  )
}

export default AdminStock
