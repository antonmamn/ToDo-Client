
import axios from 'axios';


const authRequiredEndpoints = [
  '/todo',  
];


const api = axios.create({
  baseURL: 'http://localhost:8000',
});


api.interceptors.request.use(
  (config) => { 
    const requiresAuth = authRequiredEndpoints.some(endpoint =>
      config.url.startsWith(endpoint)
    );

    if (requiresAuth) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
