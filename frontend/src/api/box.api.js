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

export const getPaymentDetails = () => api.get('/cajas/payment-details/');

export const createCajaPersona = (cajaPersona) => api.post('/cajaspersona/', cajaPersona);

export const getCajaPersonas = () => api.get('/cajaspersona/');

export const getCajaPersona = (id) => api.get(`/cajaspersona/${id}/`);

export const deleteCajaPersona = (id) => api.delete(`/cajaspersona/${id}/`);

export const updateCajaPersona = (id, cajaPersona) => api.put(`/cajaspersona/${id}/`, cajaPersona);

export const approvePayment = (id) => api.post(`/cajaspersona/${id}/approve_payment/`);

export const rejectPayment = (id) => api.post(`/cajaspersona/${id}/reject_payment/`);

export const confirmDelivery = (id) => api.post(`/cajaspersona/${id}/confirm_delivery/`);

export const getNotifications = ()=> { return api.get('/notifications/') }
export const markNotificationAsRead = (id)=> { return api.post(`/notifications/${id}/mark_as_read/`) }

export const getPagoMovilConfig = ()=> { return api.get('/pago-movil-config/') }
export const updatePagoMovilConfig = (id, data)=> { return api.put(`/pago-movil-config/${id}/`, data) }

export const getDollarRate = () => api.get('/dollar-rate/');

export const clearSeasonData = (data) => api.post('/cajas/clear_season_data/', data);

export default api