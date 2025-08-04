"use client"

import { useState } from "react"
import { Save, X, Upload, Eye, EyeOff } from "lucide-react"
import "./Forms.css"

const Forms = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
    startDate: "",
    salary: "",
    description: "",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    terms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checkbox = e.target
      if (name.startsWith("notifications.")) {
        const notificationKey = name.split(".")[1]
        setFormData((prev) => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [notificationKey]: checkbox.checked,
          },
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checkbox.checked,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
      department: "",
      startDate: "",
      salary: "",
      description: "",
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      terms: false,
    })
  }

  return (
    <div className="forms">
      <div className="forms__header">
        <h1 className="forms__title">Formularios</h1>
        <p className="forms__subtitle">Gestiona información de usuarios y configuraciones</p>
      </div>

      <form onSubmit={handleSubmit} className="forms__form">
        {/* Personal Information */}
        <div className="forms__section">
          <h2 className="forms__section-title">Información Personal</h2>

          <div className="forms__grid">
            <div className="forms__field">
              <label className="forms__label">Nombre *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="forms__input"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className="forms__field">
              <label className="forms__label">Apellido *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="forms__input"
                placeholder="Ingresa tu apellido"
                required
              />
            </div>

            <div className="forms__field">
              <label className="forms__label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="forms__input"
                placeholder="ejemplo@email.com"
                required
              />
            </div>

            <div className="forms__field">
              <label className="forms__label">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="forms__input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="forms__section">
          <h2 className="forms__section-title">Seguridad</h2>

          <div className="forms__grid">
            <div className="forms__field">
              <label className="forms__label">Contraseña *</label>
              <div className="forms__password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="forms__input"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="forms__password-toggle">
                  {showPassword ? (
                    <EyeOff className="forms__password-icon" />
                  ) : (
                    <Eye className="forms__password-icon" />
                  )}
                </button>
              </div>
            </div>

            <div className="forms__field">
              <label className="forms__label">Confirmar Contraseña *</label>
              <div className="forms__password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="forms__input"
                  placeholder="Repite la contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="forms__password-toggle"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="forms__password-icon" />
                  ) : (
                    <Eye className="forms__password-icon" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="forms__section">
          <h2 className="forms__section-title">Información Laboral</h2>

          <div className="forms__grid forms__grid--three">
            <div className="forms__field">
              <label className="forms__label">Rol *</label>
              <select name="role" value={formData.role} onChange={handleInputChange} className="forms__select" required>
                <option value="">Selecciona un rol</option>
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
                <option value="user">Usuario</option>
                <option value="viewer">Visualizador</option>
              </select>
            </div>

            <div className="forms__field">
              <label className="forms__label">Departamento</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="forms__select"
              >
                <option value="">Selecciona departamento</option>
                <option value="it">Tecnología</option>
                <option value="hr">Recursos Humanos</option>
                <option value="finance">Finanzas</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Ventas</option>
              </select>
            </div>

            <div className="forms__field">
              <label className="forms__label">Fecha de Inicio</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="forms__input"
              />
            </div>

            <div className="forms__field">
              <label className="forms__label">Salario</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="forms__input"
                placeholder="50000"
                min="0"
                step="1000"
              />
            </div>
          </div>

          <div className="forms__field">
            <label className="forms__label">Descripción del Puesto</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="forms__textarea"
              placeholder="Describe las responsabilidades y funciones del puesto..."
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="forms__section">
          <h2 className="forms__section-title">Preferencias de Notificación</h2>

          <div className="forms__checkboxes">
            <label className="forms__checkbox">
              <input
                type="checkbox"
                name="notifications.email"
                checked={formData.notifications.email}
                onChange={handleInputChange}
                className="forms__checkbox-input"
              />
              <span className="forms__checkbox-label">Notificaciones por email</span>
            </label>

            <label className="forms__checkbox">
              <input
                type="checkbox"
                name="notifications.sms"
                checked={formData.notifications.sms}
                onChange={handleInputChange}
                className="forms__checkbox-input"
              />
              <span className="forms__checkbox-label">Notificaciones por SMS</span>
            </label>

            <label className="forms__checkbox">
              <input
                type="checkbox"
                name="notifications.push"
                checked={formData.notifications.push}
                onChange={handleInputChange}
                className="forms__checkbox-input"
              />
              <span className="forms__checkbox-label">Notificaciones push</span>
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="forms__section">
          <h2 className="forms__section-title">Documentos</h2>

          <div className="forms__upload">
            <Upload className="forms__upload-icon" />
            <p className="forms__upload-text">Arrastra archivos aquí o haz clic para seleccionar</p>
            <input type="file" multiple className="forms__upload-input" id="file-upload" />
            <label htmlFor="file-upload" className="forms__upload-button">
              Seleccionar Archivos
            </label>
          </div>
        </div>

        {/* Terms */}
        <div className="forms__section">
          <label className="forms__checkbox">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              className="forms__checkbox-input"
              required
            />
            <span className="forms__checkbox-label">
              Acepto los{" "}
              <a href="#" className="forms__link">
                términos y condiciones
              </a>{" "}
              y la{" "}
              <a href="#" className="forms__link">
                política de privacidad
              </a>
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="forms__actions">
          <button type="button" onClick={handleReset} className="forms__button forms__button--secondary">
            <X className="forms__button-icon" />
            Limpiar
          </button>
          <button type="submit" className="forms__button forms__button--primary">
            <Save className="forms__button-icon" />
            Guardar Usuario
          </button>
        </div>
      </form>
    </div>
  )
}

export default Forms
