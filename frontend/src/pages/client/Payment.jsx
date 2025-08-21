import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '../../components/layout/Layout';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Smartphone, DollarSign, Upload } from 'lucide-react';
import { createCajaPersona, getPaymentDetails, getDollarRate } from '../../api/box.api'; // Using combined API call
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal';
import { toast } from 'react-hot-toast';
import { venezuelanBanks, handleNumericInput, phoneRegex } from '../../utils/validations'; // Import venezuelanBanks and phoneRegex

const paymentSchema = z.object({
    paymentMethod: z.enum(['mobile', 'cash']),
    reference: z.string()
      .max(30, { message: 'La referencia no puede tener más de 30 caracteres' })
      .regex(/^\d+$/, 'El número de referencia debe contener solo dígitos.')
      .optional(),
    bank_name: z.string().optional(),
    sender_phone: z.string()
      .regex(phoneRegex, 'El formato del teléfono no es válido (04XX-XXXXXXX)')
      .optional(),
    receipt: z.any().optional()
  }).refine(data => {
    if (data.paymentMethod === 'mobile') {
      return !!data.reference && data.reference.length > 0;
    }
    return true;
  }, {
    message: 'El número de referencia es requerido para Pago Móvil',
    path: ['reference'],
  }).refine(data => {
    if (data.paymentMethod === 'mobile') {
      return !!data.bank_name && data.bank_name.length > 0;
    }
    return true;
  }, {
    message: 'El banco emisor es requerido para Pago Móvil',
    path: ['bank_name'],
  }).refine(data => {
    if (data.paymentMethod === 'mobile') {
      return !!data.sender_phone && data.sender_phone.length > 0;
    }
    return true;
  }, {
    message: 'El número de teléfono del emisor es requerido para Pago Móvil',
    path: ['sender_phone'],
  });


const ClientPayment = () => {
  const [caja, setCaja] = useState(null);
  const [pagoMovilConfig, setPagoMovilConfig] = useState(null);
  const [dollarRate, setDollarRate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Kept for potential future use
  const [loading, setLoading] = useState(true); // Changed to true initially
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paymentMethod: 'mobile' }
  });

  const paymentMethod = watch('paymentMethod');

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [detailsRes, rateRes] = await Promise.all([
          getPaymentDetails(),
          getDollarRate()
        ]);
        setCaja(detailsRes.data.caja);
        setPagoMovilConfig(detailsRes.data.pago_movil_config);
        setDollarRate(rateRes.data.rate);
      } catch (err) {
        console.error("Error loading page data:", err);
        setServerError("No se pudieron cargar los detalles de la página de pago.");
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  const onSubmit = async (data) => {
    if (!caja) {
      setServerError("Los detalles de la caja no están cargados. Por favor, espere.");
      return;
    }

    setLoading(true);
    setServerError(null);

    const formData = new FormData();
    formData.append('cajaid', caja.id);
    formData.append('payment_method', data.paymentMethod === 'mobile' ? 'Pago Movil' : 'Efectivo'); // Changed to match backend serializer choices
    formData.append('amount', caja.price);
    formData.append('moneda', caja.moneda || 'Bs'); // Use caja.moneda or default to Bs

    if (data.paymentMethod === 'mobile') {
      formData.append('reference', data.reference);
      formData.append('bank_name', data.bank_name); // New field
      formData.append('sender_phone', data.sender_phone); // New field
      if (data.receipt && data.receipt[0]) {
        formData.append('img', data.receipt[0]);
      }
    }

    try {
      await createCajaPersona(formData);
      toast.success('Pago reportado exitosamente!');
      navigate('/payment-history'); // Changed to payment-history
    } catch (err) {
      console.error("Error reporting payment:", err);
      setServerError(err.response?.data?.error || "Error al procesar el pago. Intente de nuevo.");
      toast.error('Error al reportar el pago.');
    } finally {
      setLoading(false);
    }
  };

  const paymentsDisabled = caja && !caja.payments_enabled; // Check if caja is loaded before accessing payments_enabled

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (serverError) {
    return <div className="flex justify-center items-center h-screen text-red-500">{serverError}</div>;
  }

  if (!caja) {
    return <div className="flex justify-center items-center h-screen text-red-500">No hay detalles de caja disponibles.</div>;
  }

  return (

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Realizar Pago</h1>
          <p className="text-red-100">Completa tu pago de manera segura</p>
        </div>

        {paymentsDisabled && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Pagos Deshabilitados:</strong>
            <span className="block sm:inline"> En este momento, los pagos están deshabilitados por el administrador.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                {serverError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{serverError}</div>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Método de Pago</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setValue('paymentMethod', 'mobile')}
                        className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${paymentMethod === 'mobile' ? 'border-red-600 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                      >
                        <Smartphone className="h-6 w-6 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium">Pago Móvil</p>
                          <p className="text-sm text-gray-600">Transferencia bancaria</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setValue('paymentMethod', 'cash')}
                        className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${paymentMethod === 'cash' ? 'border-red-600 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                      >
                        <DollarSign className="h-6 w-6 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium">Efectivo</p>
                          <p className="text-sm text-gray-600">Pago en efectivo</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'mobile' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">Datos del Pago Móvil</h3>
                      {pagoMovilConfig && (
                        <div className="mb-4 p-4 border rounded-md bg-gray-100">
                            <h4 className="text-md font-bold mb-2">Datos para Transferencia:</h4>
                            <p><strong>Cédula/RIF:</strong> {pagoMovilConfig.cedula}</p>
                            <p><strong>Teléfono:</strong> {pagoMovilConfig.telefono}</p>
                            <p><strong>Banco:</strong> {pagoMovilConfig.banco}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">Banco Emisor</label>
                        <select
                          id="bank_name"
                          {...register("bank_name")}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Seleccione un banco</option>
                          {Object.keys(venezuelanBanks).map((bankName) => (
                            <option key={bankName} value={bankName}>
                              {bankName}
                            </option>
                          ))}
                        </select>
                        {errors.bank_name && <p className="mt-2 text-sm text-red-600">{errors.bank_name.message}</p>}
                      </div>
                      <Input
                        label="Número de Teléfono del Emisor"
                        {...register("sender_phone")}
                        onInput={handleNumericInput}
                        placeholder="0412XXXXXXX"
                        error={errors.sender_phone?.message}
                      />
                      <Input
                        label="Número de Referencia"
                        {...register("reference")}
                        onInput={handleNumericInput}
                        maxLength={30}
                        placeholder="123456789"
                        error={errors.reference?.message}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comprobante de Pago</label>
                        <input
                          type="file"
                          accept="image/*"
                          {...register("receipt")}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        />
                         {errors.receipt && <p className="mt-2 text-sm text-red-600">{errors.receipt.message}</p>}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cash' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">Pago en Efectivo</h3>
                      <p className="text-sm text-gray-600">Por favor, diríjase a la oficina para realizar su pago en efectivo.</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading || !caja || paymentsDisabled}> {/* Added paymentsDisabled */}
                    {loading ? 'Enviando...' : `Confirmar Pago de $${caja?.price || '...'}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader><CardTitle>Resumen del Pago</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cantidad de cajas:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio por caja:</span>
                    <span className="font-medium">${caja?.price || '0.00'}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">${caja?.price || '0.00'}</p>
                        {dollarRate && (
                          <p className="text-sm text-gray-500">
                            Bs. {(caja.price * dollarRate).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
     

  );
};

export default ClientPayment;
