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


export default api