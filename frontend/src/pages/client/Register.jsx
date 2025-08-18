import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { Eye, EyeOff, UserPlus, User, Mail, Phone, MapPin } from 'lucide-react'
import { registerUser } from '../../api/users.api'

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    username:'',
    fullname: '',
    email: '',
    phone: '',
    cedula: '',
    address: '',
    password: '',
    password2: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)







  const handleInputChange = (e) => {
    const { name, value } = e.target
     
    if(name==='phone'){
         if(/^\d{0,11}$/.test(value)){
              
           setFormData(prev=>({
          ...prev,
          [name]:value
        }))
      }
    
    }else

    if(name==='cedula'){

      if(/^\d{0,8}$/.test(value)){

           setFormData(prev=>({
          ...prev,
          [name]:value
        }))
      }
    }
    else{ 

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }}

 const validateForm = () => {
  const newErrors = {}
  
  if (!formData.fullname.trim()) {
    newErrors.fullname = 'El nombre es requerido'
  }
  
   if (!formData.username) {
    newErrors.username = 'El nombre de usuario es requerido'
  } 

  if (!formData.email) {
    newErrors.email = 'El email es requerido'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'El email no es válido'
  }
  
  if (!formData.phone) {
    newErrors.phone = 'El teléfono es requerido'
  }
  
  if (!formData.cedula) {
    newErrors.cedula = 'La cédula es requerida'
  } else if (!/^\d{7,8}$/.test(formData.cedula)) {
    newErrors.cedula = 'La cédula debe tener entre 7 y 8 dígitos'
  }
  
  if (!formData.password) {
    newErrors.password = 'La contraseña es requerida'
  } else if (formData.password.length < 6) {
    newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
  }
  
  if (!formData.password2) {
    newErrors.password2 = 'Confirma tu contraseña'
  } else if (formData.password !== formData.password2) {
    newErrors.password2 = 'Las contraseñas no coinciden'
  }
  
  return newErrors
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)

    const submissionData = {
      ...formData,
      address: `urb ciudad varyna, ${formData.address}`
    }
    
    try {
      await registerUser(submissionData)
      
      console.log('Registration successful:', submissionData)
      
      // Redirect to login
      window.location.href = '/login'
      
    } catch (error) {
      setErrors({ general: 'Error al crear la cuenta. Intenta nuevamente.' })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <Input
              label="Nombre de usuario"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              placeholder="Tu nombre de usuario"
              required
            />
                 

             
            <Input
              label="Nombre Completo"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              error={errors.fullname}
              placeholder="Tu nombre completo"
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="tu@email.com"
              required
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="0414-1234567"
                required
              />

              <Input
                label="Cédula"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                error={errors.cedula}
                placeholder="12345678"
                required
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
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-red-500 focus:border-red-500 sm:text-sm border-gray-300"
                  placeholder="Tu dirección completa"
                />
              </div>
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="relative">
              <Input
                label="Contraseña"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="••••••••"
                required
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
                name="password2"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.password2}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Acepto los{' '}
                <a href="#" className="text-red-600 hover:text-red-500">
                  términos y condiciones
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Crear Cuenta
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientRegister
