import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Layout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { Mail, Save } from 'lucide-react'
import { getSupportConfig, updateSupportConfig } from '../../api/box.api'

import { phoneRegex } from '../../utils/validations'

const supportSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido' }),
  phone_number: z.string().regex(phoneRegex, 'El formato del teléfono no es válido (04XX-XXXXXXX)').optional(),
});

const AdminSupportConfig = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [config, setConfig] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supportSchema),
  });

  useEffect(() => {
    const fetchSupportConfig = async () => {
      try {
        setLoading(true);
        const res = await getSupportConfig();
        setConfig(res.data);
        setValue('email', res.data.email, { shouldValidate: true });
        setValue('phone_number', res.data.phone_number, { shouldValidate: true });
        setError(null);
      } catch (err) {
        setError('Error al cargar la configuración de soporte.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupportConfig();
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      await updateSupportConfig(config.id, data);
      alert('Correo de soporte actualizado exitosamente');
    } catch (error) {
      alert('Error al actualizar el correo de soporte');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <Layout isAdmin={true}><div className="text-center p-8">Cargando...</div></Layout>
  }

  if (error) {
    return <Layout isAdmin={true}><div className="text-center p-8 text-red-600">{error}</div></Layout>
  }

  return (
    <Layout isAdmin={true}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Configuración de Soporte</h1>
          <p className="text-red-100">Administra el correo electrónico de contacto para soporte</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Correo Electrónico de Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Correo Electrónico"
                {...register('email')}
                placeholder="support@example.com"
                error={errors.email?.message}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
              <Input
                label="Número de Teléfono"
                {...register('phone_number')}
                placeholder="04123456789"
                error={errors.phone_number?.message}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Guardando...' : 'Guardar Configuración'}
                <Save className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default AdminSupportConfig;
