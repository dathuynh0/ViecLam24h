import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true // sử dụng cookie
})

// tự gắn token vào request header
api.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
})

export default api;