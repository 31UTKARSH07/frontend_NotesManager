import axios from 'axios';

// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://backend-notesmanager-1.onrender.com/api/auth" 
  : "http://localhost:5001/api/auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

let accessToken = '';
export const setAccessToken = (token) => {
  accessToken = token;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with proper error handling
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error.response exists and status is 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        console.log('Attempting to refresh token...');
        
        // Create a new axios instance without interceptors for refresh call
        const refreshApi = axios.create({
          baseURL: BASE_URL,
          withCredentials: true,
        });
        
        const { data } = await refreshApi.post('/refresh');
        const newAccessToken = data.data.accessToken;
        
        setAccessToken(newAccessToken); 
        processQueue(null, newAccessToken);
        
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        console.log('Token refreshed successfully');
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        processQueue(refreshError, null);
        
        // Clear the access token
        setAccessToken('');
        
        // Redirect to login page or handle auth failure
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // For non-401 errors or if refresh was already attempted
    return Promise.reject(error);
  }
);

export default api;