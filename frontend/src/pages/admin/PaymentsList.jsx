import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { Search, CheckCircle, X, Eye, ChevronLeft, ChevronRight, Download, CreditCard } from 'lucide-react'
import { getCajaPersonas, approvePayment, rejectPayment, confirmDelivery, getDollarRate } from '../../api/box.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const AdminPaymentsList = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dollarRate, setDollarRate] = useState(null)

  const [selectedPayments, setSelectedPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const [paymentsRes, rateRes] = await Promise.all([
        getCajaPersonas(),
        getDollarRate()
      ]);
      setPayments(paymentsRes.data)
      setDollarRate(rateRes.data.rate)
    } catch (err) {
      setError('Error al cargar los datos.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const itemsPerPage = 10
  const totalPages = Math.ceil(payments.length / itemsPerPage)

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const user = payment.user || {};
    const matchesSearch = (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (payment.reference && payment.reference.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  const handleStatusChange = async (paymentId, action) => {
    try {
      switch (action) {
        case 'approve':
          await approvePayment(paymentId)
          break
        case 'reject':
          await rejectPayment(paymentId)
          break
        case 'deliver':
          await confirmDelivery(paymentId)
          break
        default:
          return
      }
      fetchPayments() // Refetch to update the list
    } catch (err) {
      alert(`Error al actualizar el estado del pago.`)
      console.error(err)
    }
  }

  const handleBulkAction = (action) => {
    selectedPayments.forEach(paymentId => {
      handleStatusChange(paymentId, action)
    })
    setSelectedPayments([])
  }

  const getStatusBadge = (status, delivered) => {
    if (delivered) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Entregado
        </span>
      )
    }
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprobado' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazado' }
    }
    
    const config = statusConfig[status] || statusConfig.PENDING
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const showReceipt = (receipt) => {
    const imageUrl = `${import.meta.env.VITE_BASE_API_URL}${receipt}`
    setSelectedReceipt(imageUrl)
    setShowReceiptModal(true)
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Usuario', 'Email', 'Método de Pago', 'Referencia', 'Monto', 'Fecha', 'Estado', 'Entregado'];
    const rows = filteredPayments.map(p => [
      p.id,
      p.user?.username,
      p.user?.email,
      p.payment_method,
      p.reference,
      p.amount,
      new Date(p.date).toLocaleDateString(),
      p.status,
      p.delivered
    ].map(field => `"${String(field).replace(/"/g, '""')}"`)); // Escape quotes

    let csvContent = "data:text/csv;charset=utf-8,"
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pagos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [['ID', 'Usuario', 'Email', 'Referencia', 'Monto (USD)', 'Monto (Bs)', 'Fecha', 'Estado']],
      body: filteredPayments.map(p => [
        p.id,
        p.user?.fullname || p.user?.username,
        p.user?.email,
        p.reference,
        `$${p.amount}`,
        dollarRate ? `Bs. ${(p.amount * dollarRate).toFixed(2)}` : 'N/A',
        new Date(p.date).toLocaleDateString(),
        p.status,
      ]),
    })
    doc.save('pagos.pdf')
  }

  if (loading) {
    return <Layout isAdmin={true}><div className="text-center p-8">Cargando...</div></Layout>
  }

  if (error) {
    return <Layout isAdmin={true}><div className="text-center p-8 text-red-600">{error}</div></Layout>
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
                  <option value="PENDING">Pendientes</option>
                  <option value="APPROVED">Aprobados</option>
                  <option value="REJECTED">Rechazados</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <Button onClick={exportToCSV} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
                <Button onClick={exportToPDF} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>

                {/* Bulk Actions */}
                {selectedPayments.length > 0 && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleBulkAction('approve')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Aprobar ({selectedPayments.length})
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction('deliver')}
                    >
                      Marcar Entregado
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction('reject')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
              </div>
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
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Fecha</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Estado</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedPayments.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <CreditCard className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">No hay pagos disponibles</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Cuando los usuarios realicen pagos, aparecerán aquí.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedPayments.map((payment) => (
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
                            <div className="font-medium text-gray-900">{payment.user?.fullname || payment.user?.username}</div>
                            <div className="text-gray-500">{payment.user?.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-gray-900">{payment.payment_method}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {payment.reference}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div>${payment.amount}</div>
                          {dollarRate && (
                            <div className="text-sm text-gray-500">
                              Bs. {(payment.amount * dollarRate).toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(payment.status, payment.delivered)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {payment.img && (
                              <button
                                onClick={() => showReceipt(payment.img)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Ver comprobante"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            )}

                            {payment.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(payment.id, 'approve')}
                                  className="text-green-600 hover:text-green-800"
                                  title="Aprobar"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(payment.id, 'reject')}
                                  className="text-red-600 hover:text-red-800"
                                  title="Rechazar"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}

                            {payment.status === 'APPROVED' && !payment.delivered && (
                              <button
                                onClick={() => handleStatusChange(payment.id, 'deliver')}
                                className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border border-blue-600 rounded"
                              >
                                Entregar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
                <div className="flex items-center space-x-4">
                  <a
                    href={selectedReceipt}
                    download="comprobante.jpg"
                    className="text-blue-600 hover:text-blue-800"
                    title="Descargar"
                  >
                    <Download className="h-6 w-6" />
                  </a>
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <img
                  src={selectedReceipt}
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
