import axios from "axios";

const API_BASE_URL = 'https://ecommerce-project-backend-gy68.onrender.com/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use(
    config => {
        console.log('Request URL: ', config.url);
        
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
)

export default api;