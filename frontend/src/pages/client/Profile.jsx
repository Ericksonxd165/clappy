import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '../../components/layout/Layout';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { User, Mail, Phone, MapPin, Save, Edit3 } from 'lucide-react';
import { getCurrentUser, updateCurrentUser } from '../../api/users.api';
import {MoonLoader} from 'react-spinners'

const profileSchema = z.object({
  fullname: z.string().min(1, 'El nombre es requerido').regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z.string().min(1, 'El teléfono es requerido').regex(/^04(12|14|16|24|26)\d{7}$/, 'El formato del teléfono no es válido (04XX-XXXXXXX)'),
  cedula: z.string().min(7, 'La cédula debe tener entre 7 y 8 dígitos').max(8, 'La cédula debe tener entre 7 y 8 dígitos').regex(/^\d+$/, 'La cédula solo puede contener números'),
  address: z.string().min(1, 'La dirección es requerida'),
});

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUser();
      setProfileData(res.data);
      reset(res.data); // Set form default values
    } catch (err) {
      setError('Error al cargar el perfil.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSave = async (data) => {
    try {
      const res = await updateCurrentUser(data);
      setProfileData(res.data);
      reset(res.data);
      setIsEditing(false);
      alert('Perfil actualizado exitosamente.');
    } catch (err) {
      setError('Error al guardar el perfil.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    reset(profileData); // Reset form to original data
    setIsEditing(false);
  };

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  if (loading) {
    return <Layout><div style={{display:"flex", justifyContent:"center", alignItems:"center",minHeight:"100vh"}} >
      <MoonLoader 
       color={"red"}
       size={60}
       loading={true}
      />
    </div>;</Layout>;
  }

  if (error) {
    return <Layout><div className="text-center p-8 text-red-600">{error}</div></Layout>;
  }

  return (

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-red-100">Gestiona tu información personal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    <User className="h-16 w-16 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData?.fullname}</h2>
                <p className="text-gray-600 mb-4">{profileData?.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miembro desde:</span>
                    <span className="font-medium">{new Date(profileData?.date_joined).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSave)}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Información Personal</CardTitle>
                  {!isEditing ? (
                    <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button type="button" variant="ghost" onClick={handleCancel}>Cancelar</Button>
                      <Button type="submit"><Save className="h-4 w-4 mr-2" />Guardar</Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nombre Completo"
                      {...register("fullname")}
                      disabled={!isEditing}
                      icon={User}
                      error={errors.fullname?.message}
                    />
                    <Input
                      label="Email"
                      type="email"
                      {...register("email")}
                      disabled={!isEditing}
                      icon={Mail}
                      error={errors.email?.message}
                    />
                    <Input
                      label="Teléfono"
                      {...register("phone")}
                      onInput={handleNumericInput}
                      maxLength={11}
                      disabled={!isEditing}
                      icon={Phone}
                      error={errors.phone?.message}
                    />
                    <Input
                      label="Cédula"
                      {...register("cedula")}
                      onInput={handleNumericInput}
                      maxLength={8}
                      disabled={!isEditing}
                      error={errors.cedula?.message}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Dirección"
                        {...register("address")}
                        disabled={!isEditing}
                        icon={MapPin}
                        error={errors.address?.message}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>

  );
};

export default ClientProfile;
