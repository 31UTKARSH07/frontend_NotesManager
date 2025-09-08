import axios from 'axios';


// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://backend-notesmanager-1.onrender.com/api/auth" 
  : "http://localhost:5001/api/auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

let accessToken = '';
export const setAccessToken = (token) => {
  accessToken = token;
};
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/refresh');
        const newAccessToken = data.data.accessToken;
        setAccessToken(newAccessToken); 
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default api;