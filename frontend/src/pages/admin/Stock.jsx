import { useState, useEffect } from 'react'
import Uilayout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { Package, DollarSign, Plus, Minus, Save, History, TrendingUp, AlertTriangle } from 'lucide-react'
import { getCaja, updateCaja } from '../../api/box.api'

const AdminStock = () => {
  const [caja, setCaja] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [newPrice, setNewPrice] = useState('')
  const [stockAdjustment, setStockAdjustment] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState('')
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false)
  const [isUpdatingStock, setIsUpdatingStock] = useState(false)

  const fetchCaja = async () => {
    try {
      setLoading(true)
      const res = await getCaja()
      if (res.data.length > 0) {
        const cajaData = res.data[0]
        setCaja(cajaData)
        setNewPrice(cajaData.price)
      } else {
        setError('No se encontraron cajas. Por favor, crea una primero.')
      }
    } catch (err) {
      setError('Error al cargar los datos de la caja.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaja()
  }, [])

  const handlePriceUpdate = async () => {
    if (newPrice <= 0) {
      alert('El precio debe ser mayor a 0')
      return
    }
    setIsUpdatingPrice(true)
    try {
      await updateCaja(caja.id, { ...caja, price: newPrice })
      await fetchCaja() // Refetch to get the latest data
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
    const newStock = caja.stock + stockAdjustment
    if (newStock < 0) {
      alert('No puedes tener stock negativo')
      return
    }
    setIsUpdatingStock(true)
    try {
      await updateCaja(caja.id, { ...caja, stock: newStock })
      await fetchCaja() // Refetch to get the latest data
      setStockAdjustment(0)
      alert('Stock actualizado exitosamente')
    } catch (error) {
      alert('Error al actualizar el stock')
    } finally {
      setIsUpdatingStock(false)
    }
  }

  const getStockStatus = () => {
    // A low stock alert threshold can be added to the model later if needed.
    const lowStockAlert = 10;
    if (caja.stock <= lowStockAlert) {
      return { color: 'text-red-600', bg: 'bg-red-100', status: 'Stock Bajo' }
    } else if (caja.stock <= lowStockAlert * 2) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Stock Medio' }
    } else {
      return { color: 'text-green-600', bg: 'bg-green-100', status: 'Stock Alto' }
    }
  }

  const stockStatus = getStockStatus()

  if (loading) {
    return <Uilayout isAdmin={true}><div className="text-center p-8">Cargando...</div></Uilayout>
  }

  if (error) {
    return <Uilayout isAdmin={true}><div className="text-center p-8 text-red-600">{error}</div></Uilayout>
  }

  if (!caja) {
    return <Uilayout isAdmin={true}><div className="text-center p-8">No hay caja para mostrar.</div></Uilayout>
  }

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
                  <p className="text-2xl font-bold text-gray-900">{caja.stock}</p>
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
                  <p className="text-2xl font-bold text-gray-900">${caja.price}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{caja.sold}</p>
                  <p className="text-xs text-blue-600">Total</p>
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
                  <p className="text-sm font-medium text-gray-600">Ingresos (Estimado)</p>
                  <p className="text-2xl font-bold text-gray-900">${(caja.sold * parseFloat(caja.price)).toFixed(2)}</p>
                  <p className="text-xs text-purple-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stock Alert */}
        {caja.stock <= 10 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">¡Stock Bajo!</h3>
                  <p className="text-sm text-red-700">
                    Solo quedan {caja.stock} cajas. Considera reabastecer pronto.
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
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="150"
                      min="1"
                      step="0.01"
                    />
                    <Button
                      onClick={handlePriceUpdate}
                      disabled={isUpdatingPrice || newPrice === caja.price}
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
                    Stock resultante: {caja.stock + stockAdjustment}
                  </p>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Uilayout>
  )
}

export default AdminStock
