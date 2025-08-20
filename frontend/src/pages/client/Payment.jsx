import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '../../components/layout/Layout';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Smartphone, DollarSign, Upload } from 'lucide-react';
import { createCajaPersona, getCaja, getPagoMovilConfig } from '../../api/box.api';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/UI/Modal';

const paymentSchema = z.object({
    paymentMethod: z.enum(['mobile', 'cash']),
    reference: z.string()
      .max(30, { message: 'La referencia no puede tener más de 30 caracteres' })
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
      return !!data.receipt && data.receipt.length > 0;
    }
    return true;
  }, {
    message: 'El comprobante es requerido para Pago Móvil',
    path: ['receipt'],
  });


const ClientPayment = () => {
  const [caja, setCaja] = useState(null);
  const [pagoMovilConfig, setPagoMovilConfig] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
        const cajaRes = await getCaja();
        if (cajaRes.data.length > 0) {
          setCaja(cajaRes.data[0]);
        }
        const configRes = await getPagoMovilConfig();
        setPagoMovilConfig(configRes.data);
      } catch (err) {
        setServerError("No se pudieron cargar los detalles de la página de pago.");
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
    formData.append('payment_method', data.paymentMethod === 'mobile' ? 'Pago Movil' : 'Efectivo');
    formData.append('amount', caja.price);
    formData.append('moneda', 'USD');

    if (data.paymentMethod === 'mobile') {
      formData.append('reference', data.reference);
      formData.append('img', data.receipt[0]);
    }

    try {
      await createCajaPersona(formData);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.error || "Error al procesar el pago. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Realizar Pago</h1>
          <p className="text-red-100">Completa tu pago de manera segura</p>
        </div>

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

                  <Button type="submit" className="w-full" disabled={loading || !caja}>
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
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-red-600">${caja?.price || '0.00'}</span>
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
