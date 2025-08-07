import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

const ClientForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('El email es requerido')
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El email no es válido')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock success
      setIsEmailSent(true)
      
    } catch (error) {
      setError('Error al enviar el email. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock success - could show a toast notification here
      console.log('Email reenviado')
      
    } catch (error) {
      setError('Error al reenviar el email.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                ¡Email Enviado!
              </h2>
              
              <p className="mt-4 text-sm text-gray-600">
                Hemos enviado un enlace de recuperación a:
              </p>
              
              <p className="mt-2 text-sm font-medium text-gray-900">
                {email}
              </p>
              
              <p className="mt-4 text-sm text-gray-600">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
              
              <div className="mt-6 space-y-4">
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                      Reenviando...
                    </div>
                  ) : (
                    'Reenviar Email'
                  )}
                </Button>
                
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Volver al Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">CC</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Recuperar Contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingresa tu email para recibir un enlace de recuperación
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                Te enviaremos un enlace seguro para restablecer tu contraseña
              </p>
            </div>

            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              error={error}
              placeholder="tu@email.com"
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Enlace de Recuperación
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-red-600 hover:text-red-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientForgotPassword
