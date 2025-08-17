import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { Smartphone, DollarSign, Upload } from 'lucide-react'
import { createCajaPersona, getCaja } from '../../api/box.api'
import { useNavigate } from 'react-router-dom'

const ClientPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('mobile')
  const [formData, setFormData] = useState({
    boxes: 1,
    paymentType: 'mobile',
    // Pago Móvil fields
    bank: '',
    phone: '',
    cedula: '',
    reference: '',
    amount: '',
    // Efectivo fields
    cashAmount: '',
    notes: ''
  })
  const [receipt, setReceipt] = useState(null)
  const [caja, setCaja] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCaja = async () => {
      try {
        const res = await getCaja()
        // Assuming there is only one type of caja for now
        if (res.data.length > 0) {
          setCaja(res.data[0])
        }
      } catch (err) {
        setError("Failed to load box details.")
      }
    }
    fetchCaja()
  }, [])

  const boxPrice = caja ? parseFloat(caja.price) : 0
  const totalAmount = formData.boxes * boxPrice

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setReceipt(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!caja) {
      setError("Caja details not loaded yet. Please wait.")
      return
    }
    if (paymentMethod === 'mobile' && !receipt) {
      setError("Please upload a payment receipt.")
      return
    }

    setLoading(true)
    setError(null)

    const data = new FormData()
    data.append('cajaid', caja.id)
    data.append('payment_method', paymentMethod === 'mobile' ? 'Pago Movil' : 'Efectivo')
    data.append('amount', totalAmount)
    data.append('moneda', 'USD') // Assuming USD for now, can be made dynamic

    if (paymentMethod === 'mobile') {
      data.append('reference', formData.reference)
      data.append('img', receipt)
    }

    try {
      await createCajaPersona(data)
      navigate('/client/dashboard') // Redirect to dashboard on success
    } catch (err) {
      setError("Failed to submit payment. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Realizar Pago</h1>
          <p className="text-red-100">Completa tu pago de manera segura</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cantidad de Cajas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad de Cajas
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, boxes: Math.max(1, prev.boxes - 1) }))}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold px-4">{formData.boxes}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, boxes: prev.boxes + 1 }))}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Método de Pago */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Método de Pago
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('mobile')
                          setFormData(prev => ({ ...prev, paymentType: 'mobile' }))
                        }}
                        className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                          paymentMethod === 'mobile' 
                            ? 'border-red-600 bg-red-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Smartphone className="h-6 w-6 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium">Pago Móvil</p>
                          <p className="text-sm text-gray-600">Transferencia bancaria</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('cash')
                          setFormData(prev => ({ ...prev, paymentType: 'cash' }))
                        }}
                        className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                          paymentMethod === 'cash' 
                            ? 'border-red-600 bg-red-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <DollarSign className="h-6 w-6 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium">Efectivo</p>
                          <p className="text-sm text-gray-600">Pago en efectivo</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Formulario Pago Móvil */}
                  {paymentMethod === 'mobile' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">Datos del Pago Móvil</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Banco"
                          name="bank"
                          value={formData.bank}
                          onChange={handleInputChange}
                          placeholder="Ej: Banesco, Mercantil..."
                          required
                        />
                        <Input
                          label="Teléfono"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0414-1234567"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Cédula"
                          name="cedula"
                          value={formData.cedula}
                          onChange={handleInputChange}
                          placeholder="12345678"
                          required
                        />
                        <Input
                          label="Monto"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder={`$${totalAmount}`}
                          required
                        />
                      </div>

                      <Input
                        label="Número de Referencia"
                        name="reference"
                        value={formData.reference}
                        onChange={handleInputChange}
                        placeholder="123456789"
                        required
                      />

                      {/* Upload Receipt */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Comprobante de Pago
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Arrastra tu comprobante aquí o haz clic para seleccionar
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="receipt-upload"
                          />
                          <label
                            htmlFor="receipt-upload"
                            className="cursor-pointer text-red-600 hover:text-red-700 font-medium"
                          >
                            Seleccionar archivo
                          </label>
                          {receipt && (
                            <p className="text-sm text-green-600 mt-2">
                              Archivo seleccionado: {receipt.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Formulario Efectivo */}
                  {paymentMethod === 'cash' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">Pago en Efectivo</h3>
                      
                      <Input
                        label="Monto en Efectivo"
                        name="cashAmount"
                        value={formData.cashAmount}
                        onChange={handleInputChange}
                        placeholder={`$${totalAmount}`}
                        required
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notas Adicionales
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Información adicional sobre el pago..."
                        />
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : 'Confirmar Pago'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cantidad de cajas:</span>
                    <span className="font-medium">{formData.boxes}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio por caja:</span>
                    <span className="font-medium">${boxPrice}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-red-600">${totalAmount}</span>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Información Importante:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• El pago será verificado en 24-48 horas</li>
                      <li>• Guarda tu comprobante de pago</li>
                      <li>• Recibirás una notificación de confirmación</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClientPayment
