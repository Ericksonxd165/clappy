import { useState } from 'react'
import Uilayout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { User, Mail, Phone, MapPin, Camera, Save, Edit3 } from 'lucide-react'

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '0414-1234567',
    cedula: '12345678',
    address: 'Caracas, Venezuela',
    registrationDate: '2024-01-15',
    totalBoxes: 3,
    totalPaid: 450
  })
  const [formData, setFormData] = useState({ ...profileData })
  const [avatar, setAvatar] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatar(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setProfileData({ ...formData })
    setIsEditing(false)
    // Here you would typically make an API call to update the profile
  }

  const handleCancel = () => {
    setFormData({ ...profileData })
    setIsEditing(false)
  }

  return (
    <Uilayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-red-100">Gestiona tu información personal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    {avatar ? (
                      <img src={avatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-16 w-16 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                <p className="text-gray-600 mb-4">{profileData.email}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Miembro desde:</span>
                    <span className="font-medium">{new Date(profileData.registrationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total de cajas:</span>
                    <span className="font-medium text-red-600">{profileData.totalBoxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total pagado:</span>
                    <span className="font-medium text-green-600">${profileData.totalPaid}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Información Personal</CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nombre Completo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={User}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={Mail}
                  />

                  <Input
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={Phone}
                  />

                  <Input
                    label="Cédula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="Dirección"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={MapPin}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Contraseña Actual"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input
                    label="Confirmar Nueva Contraseña"
                    type="password"
                    placeholder="••••••••"
                  />
                  <Button variant="outline" className="w-full">
                    Actualizar Contraseña
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Fecha</th>
                    <th className="text-left py-3 px-4">Método</th>
                    <th className="text-left py-3 px-4">Cajas</th>
                    <th className="text-left py-3 px-4">Monto</th>
                    <th className="text-left py-3 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2024-01-20', method: 'Pago Móvil', boxes: 2, amount: 300, status: 'Aprobado' },
                    { date: '2024-01-15', method: 'Efectivo', boxes: 1, amount: 150, status: 'Aprobado' },
                  ].map((payment, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4">{payment.method}</td>
                      <td className="py-3 px-4">{payment.boxes}</td>
                      <td className="py-3 px-4 font-medium">${payment.amount}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Uilayout>
  )
}

export default ClientProfile
