import axios from "axios"

const BASE = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({


baseURL: `${BASE}/clap/`,



})


api.interceptors.request.use((config)=>{

const token = localStorage.getItem('access')
if(token){

    config.headers['Authorization']=`Bearer ${token}`
}

return config
})

export const getCaja = ()=> { return api.get('/cajas/') }
export const createCaja = (data)=> { return api.post('/cajas/', data) }
export const updateCaja = (id, data)=> { return api.put(`/cajas/${id}/`, data) }

export const getCajasPersona = ()=> { return api.get('/cajaspersona/') }
export const createCajaPersona = (data)=> { return api.post('/cajaspersona/', data, { headers: { 'Content-Type': 'multipart/form-data' } }) }
export const approvePayment = (id)=> { return api.post(`/cajaspersona/${id}/approve_payment/`) }
export const rejectPayment = (id)=> { return api.post(`/cajaspersona/${id}/reject_payment/`) }
export const confirmDelivery = (id)=> { return api.post(`/cajaspersona/${id}/confirm_delivery/`) }

export const getNotifications = ()=> { return api.get('/notifications/') }
export const markNotificationAsRead = (id)=> { return api.post(`/notifications/${id}/mark_as_read/`) }

export const getPagoMovilConfig = ()=> { return api.get('/pago-movil-config/') }
export const updatePagoMovilConfig = (id, data)=> { return api.put(`/pago-movil-config/${id}/`, data) }

export default api