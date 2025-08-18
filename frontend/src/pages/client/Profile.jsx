import { useState, useEffect } from 'react'
import Uilayout from '../../components/layout/Layout'
import { Card, CardHeader, CardContent, CardTitle } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { User, Mail, Phone, MapPin, Save, Edit3 } from 'lucide-react'
import { getCurrentUser, updateCurrentUser } from '../../api/users.api'

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await getCurrentUser()
      setProfileData(res.data)
      setFormData(res.data)
    } catch (err) {
      setError('Error al cargar el perfil.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      const res = await updateCurrentUser(formData)
      setProfileData(res.data)
      setIsEditing(false)
    } catch (err) {
      setError('Error al guardar el perfil.')
      console.error(err)
    }
  }

  const handleCancel = () => {
    setFormData({ ...profileData })
    setIsEditing(false)
  }

  if (loading) {
    return <Uilayout><div className="text-center p-8">Cargando perfil...</div></Uilayout>
  }

  if (error) {
    return <Uilayout><div className="text-center p-8 text-red-600">{error}</div></Uilayout>
  }

  return (
    <Uilayout>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Información Personal</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button variant="ghost" onClick={handleCancel}>Cancelar</Button>
                    <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Guardar</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nombre Completo"
                    name="fullname"
                    value={formData?.fullname || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={User}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData?.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={Mail}
                  />
                  <Input
                    label="Teléfono"
                    name="phone"
                    value={formData?.phone || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    icon={Phone}
                  />
                  <Input
                    label="Cédula"
                    name="cedula"
                    value={formData?.cedula || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Dirección"
                      name="address"
                      value={formData?.address || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={MapPin}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Uilayout>
  )
}

export default ClientProfile
