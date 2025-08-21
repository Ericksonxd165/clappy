import axios from 'axios';

const BASE = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({ 

baseURL: `${BASE}/users/api/v1/`,


})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if(token){
config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;



  });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh');
        const res = await axios.post(`${BASE}/users/api/v1/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('refresh', res.data.refresh); // Refresh token might also be updated
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, clear tokens and redirect to login
                localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

  export const getCurrentUser = () => {  return api.get('me/');  };
  export const updateCurrentUser = (userData) => api.patch('me/', userData);
  export const registerUser = (userData) => api.post('register/',userData);
  export const loginUser = (credentials) => api.post('login/',credentials);
  export const refreshToken = (token) => axios.post(`${BASE}/users/api/v1/token/refresh/`, { refresh: token});

  // User management by admin
  export const listUsers = () => api.get('users/');
  export const createUser = (userData) => api.post('users/', userData);
  export const updateUser = (id, userData) => api.put(`users/${id}/`, userData);
  export const deleteUser = (id) => api.delete(`users/${id}/`);

  // Password Reset
  export const requestPasswordReset = (email) => api.post('password-reset/', email);
  export const confirmPasswordReset = (uidb64, token, password) => api.post(`password-reset-confirm/${uidb64}/${token}/`, password);

  export default api;