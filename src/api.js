import axios from 'axios';
import { serverUrl } from './config';

const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Call the refresh endpoint
                await axios.post(`${serverUrl}/api/auth/refresh`, {}, { withCredentials: true });
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token is also expired
                console.warn('Session expired.');
                localStorage.removeItem('userData');
                // Only redirect if on protected routes
                const publicPaths = ['/', '/login', '/signup'];
                if (!publicPaths.includes(window.location.pathname)) {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
