import { useState, useEffect } from 'react';
import { getCajaPersonas, getDollarRate } from '../../api/box.api';
import { Card, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Download, FileText, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dollarRate, setDollarRate] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [paymentsRes, rateRes] = await Promise.all([
          getCajaPersonas(),
          getDollarRate()
        ]);
        setPayments(paymentsRes.data);
        setDollarRate(rateRes.data.rate);
      } catch (err) {
        setError('Error al cargar el historial de pagos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprobado' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazado' }
    };
    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredPayments = payments.filter(p => {
    if (!filter) return true;
    const paymentDate = new Date(p.date);
    const [year, month] = filter.split('-');
    return paymentDate.getFullYear() === parseInt(year) && (paymentDate.getMonth() + 1) === parseInt(month);
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Fecha', 'Monto (USD)', 'Monto (Bs)', 'Método', 'Referencia', 'Estado'];
    const rows = filteredPayments.map(p => [
      p.id,
      new Date(p.date).toLocaleDateString(),
      p.amount,
      dollarRate ? (p.amount * dollarRate).toFixed(2) : 'N/A',
      p.payment_method,
      p.reference || 'N/A',
      p.status
    ].map(field => `"${String(field).replace(/"/g, '""')}"`));

    let csvContent = "data:text/csv;charset=utf-8,"
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "historial_pagos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Fecha', 'Monto (USD)', 'Monto (Bs)', 'Método', 'Referencia', 'Estado']],
      body: filteredPayments.map(p => [
        p.id,
        new Date(p.date).toLocaleDateString(),
        `$${p.amount}`,
        dollarRate ? `Bs. ${(p.amount * dollarRate).toFixed(2)}` : 'N/A',
        p.payment_method,
        p.reference || 'N/A',
        p.status
      ]),
    });
    doc.save('historial_pagos.pdf');
  };

  if (loading) return <div>Cargando historial...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Historial de Pagos</h1>
        <p className="text-red-100">Consulta todos tus pagos realizados</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <input
                type="month"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
              <Button onClick={exportToPDF} variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-900">Fecha</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-900">Monto</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-900">Método</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-900">Referencia</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-900">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map(payment => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div>${payment.amount}</div>
                        {dollarRate && <div className="text-xs text-gray-500">Bs. {(payment.amount * dollarRate).toFixed(2)}</div>}
                      </td>
                      <td className="px-6 py-4">{payment.payment_method}</td>
                      <td className="px-6 py-4">{payment.reference || 'N/A'}</td>
                      <td className="px-6 py-4">{getStatusBadge(payment.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-500">
                      No hay pagos que coincidan con el filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
