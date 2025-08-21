import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { requestPasswordReset } from '../../api/users.api';
import { Mail } from 'lucide-react';

const ClientForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('El correo electrónico es requerido.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      await requestPasswordReset({ email });
      setMessage('Si una cuenta con ese email existe, se ha enviado un correo de recuperación.');
      setEmail('');
    } catch (err) {
      setError('Ocurrió un error al intentar enviar el correo. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
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
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Recuperar Contraseña</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Introduce tu correo para recibir un enlace de recuperación.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              required
              error={error}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
                <div className="flex items-center justify-center">
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                            <Mail className="h-4 w-4 mr-2" />
                            <span>Enviar Enlace</span>
                        </>
                    )}
                </div>
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForgotPassword;
