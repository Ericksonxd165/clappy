import { useState } from 'react'
import Uilayout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { Search, Filter, Download, CheckCircle, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

const AdminPaymentsList = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      user: 'Juan Pérez',
      email: 'juan@email.com',
      method: 'Pago Móvil',
      bank: 'Banesco',
      reference: '123456789',
      amount: 300,
      boxes: 2,
      date: '2024-01-20',
      status: 'pending',
      receipt: '/receipt1.jpg'
    },
    {
      id: 2,
      user: 'María García',
      email: 'maria@email.com',
      method: 'Efectivo',
      bank: '-',
      reference: '-',
      amount: 150,
      boxes: 1,
      date: '2024-01-19',
      status: 'approved',
      receipt: null
    },
    {
      id: 3,
      user: 'Carlos López',
      email: 'carlos@email.com',
      method: 'Pago Móvil',
      bank: 'Mercantil',
      reference: '987654321',
      amount: 450,
      boxes: 3,
      date: '2024-01-18',
      status: 'pending',
      receipt: '/receipt3.jpg'
    },
    {
      id: 4,
      user: 'Ana Rodríguez',
      email: 'ana@email.com',
      method: 'Pago Móvil',
      bank: 'Venezuela',
      reference: '456789123',
      amount: 150,
      boxes: 1,
      date: '2024-01-17',
      status: 'delivered',
      receipt: '/receipt4.jpg'
    },
    {
      id: 5,
      user: 'Luis Martínez',
      email: 'luis@email.com',
      method: 'Efectivo',
      bank: '-',
      reference: '-',
      amount: 600,
      boxes: 4,
      date: '2024-01-16',
      status: 'rejected',
      receipt: null
    }
  ])

  const [selectedPayments, setSelectedPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const itemsPerPage = 10
  const totalPages = Math.ceil(payments.length / itemsPerPage)

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Paginate payments
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPayments.length === paginatedPayments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(paginatedPayments.map(p => p.id))
    }
  }

  const handleStatusChange = (paymentId, newStatus) => {
    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: newStatus }
          : payment
      )
    )
  }

  const handleBulkAction = (action) => {
    selectedPayments.forEach(paymentId => {
      handleStatusChange(paymentId, action)
    })
    setSelectedPayments([])
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprobado' },
      delivered: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Entregado' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazado' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const showReceipt = (receipt) => {
    setSelectedReceipt(receipt)
    setShowReceiptModal(true)
  }

  return (
    <Layout isAdmin={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Lista de Pagos</h1>
          <p className="text-red-100">Gestiona y supervisa todos los pagos realizados</p>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar por usuario, email o referencia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-80"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendientes</option>
                  <option value="approved">Aprobados</option>
                  <option value="delivered">Entregados</option>
                  <option value="rejected">Rechazados</option>
                </select>
              </div>

              {/* Bulk Actions */}
              {selectedPayments.length > 0 && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleBulkAction('approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Aprobar ({selectedPayments.length})
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('delivered')}
                  >
                    Marcar Entregado
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('rejected')}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Rechazar
                  </Button>
                </div>
              )}

              {/* Export Button */}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPayments.length === paginatedPayments.length && paginatedPayments.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Usuario</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Método</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Referencia</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Monto</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Cajas</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Fecha</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Estado</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.user}</div>
                          <div className="text-gray-500">{payment.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-gray-900">{payment.method}</div>
                          {payment.bank !== '-' && (
                            <div className="text-gray-500 text-xs">{payment.bank}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {payment.reference}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        ${payment.amount}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {payment.boxes}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {payment.receipt && (
                            <button
                              onClick={() => showReceipt(payment.receipt)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Ver comprobante"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          
                          {payment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(payment.id, 'approved')}
                                className="text-green-600 hover:text-green-800"
                                title="Aprobar"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(payment.id, 'rejected')}
                                className="text-red-600 hover:text-red-800"
                                title="Rechazar"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          
                          {payment.status === 'approved' && (
                            <button
                              onClick={() => handleStatusChange(payment.id, 'delivered')}
                              className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border border-blue-600 rounded"
                            >
                              Entregar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredPayments.length)} de {filteredPayments.length} resultados
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === i + 1
                            ? 'bg-red-600 text-white border-red-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Receipt Modal */}
        {showReceiptModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Comprobante de Pago</h3>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={`/placeholder.svg?height=600&width=400&text=Comprobante de Pago`}
                  alt="Comprobante"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminPaymentsList
