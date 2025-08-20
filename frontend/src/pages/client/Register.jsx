import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { registerUser } from '../../api/users.api';

const registerSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  fullname: z.string().min(1, 'El nombre es requerido').regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z.string().min(1, 'El teléfono es requerido').regex(/^04(12|14|16|24|26)\d{7}$/, 'El formato del teléfono no es válido (04XX-XXXXXXX)'),
  cedula: z.string().min(7, 'La cédula debe tener entre 7 y 8 dígitos').max(8, 'La cédula debe tener entre 7 y 8 dígitos').regex(/^\d+$/, 'La cédula solo puede contener números'),
  address: z.string().min(1, 'La dirección es requerida'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  password2: z.string(),
  terms: z.boolean().refine(val => val === true, { message: 'Debes aceptar los términos y condiciones' })
}).refine(data => data.password === data.password2, {
  message: 'Las contraseñas no coinciden',
  path: ['password2'],
});

const ClientRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  
  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  const onSubmit = async (data) => {
    setServerError('');
    const submissionData = {
      ...data,
      address: `urb ciudad varyna, ${data.address}`,
    };

    try {
      await registerUser(submissionData);
      alert('¡Registro exitoso! Serás redirigido a la página de inicio de sesión.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setServerError('Error al crear la cuenta. Es posible que el usuario o el correo ya existan.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">CL</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Crear Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Únete a Caja Clap y comienza a gestionar tus pagos
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {serverError}
              </div>
            )}

            <Input
              label="Nombre de usuario"
              {...register("username")}
              error={errors.username?.message}
              placeholder="Tu nombre de usuario"
            />
                 
            <Input
              label="Nombre Completo"
              {...register("fullname")}
              error={errors.fullname?.message}
              placeholder="Tu nombre completo"
            />

            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="tu@email.com"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Teléfono"
                {...register("phone")}
                onInput={handleNumericInput}
                maxLength={11}
                error={errors.phone?.message}
                placeholder="04121234567"
              />
              <Input
                label="Cédula"
                {...register("cedula")}
                onInput={handleNumericInput}
                maxLength={8}
                error={errors.cedula?.message}
                placeholder="12345678"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  urb ciudad varyna,
                </span>
                <input
                  type="text"
                  {...register("address")}
                  className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-red-500 focus:border-red-500 sm:text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Tu dirección completa"
                />
              </div>
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                {...register("password")}
                error={errors.password?.message}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register("password2")}
                error={errors.password2?.message}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms")}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Acepto los{' '}
                  <a href="#" className="text-red-600 hover:text-red-500">
                    términos y condiciones
                  </a>
                </label>
                {errors.terms && <p className="text-red-600">{errors.terms.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
