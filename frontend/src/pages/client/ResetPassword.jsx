import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { confirmPasswordReset } from '../../api/users.api';
import { Lock, CheckCircle } from 'lucide-react';

const ClientResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      await confirmPasswordReset(uidb64, token, { password });
      setMessage('Tu contraseña ha sido restablecida con éxito.');
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('El enlace de restablecimiento no es válido o ha expirado. Por favor, solicita uno nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
      return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">¡Éxito!</h2>
                    <p className="mt-2 text-gray-600">{message}</p>
                    <p className="mt-4 text-sm text-gray-500">Serás redirigido al inicio de sesión en 3 segundos...</p>
                </div>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">CL</span>
            </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Restablecer Contraseña</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Introduce tu nueva contraseña.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <Input
              label="Nueva Contraseña"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Input
              label="Confirmar Nueva Contraseña"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
                <div className="flex items-center justify-center">
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            <span>Restableciendo...</span>
                        </>
                    ) : (
                        <>
                            <Lock className="h-4 w-4 mr-2" />
                            <span>Restablecer Contraseña</span>
                        </>
                    )}
                </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientResetPassword;
