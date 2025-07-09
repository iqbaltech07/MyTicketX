import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Setiap status kode yang berada dalam rentang 2xx
    return response;
  },
  (error: AxiosError) => {    
    if (!error.response) {
      console.error('Network/Server error:', error.message);
      return Promise.reject(new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'));
    }

    switch (error.response.status) {
      case 401:
        if (window.location.pathname !== '/login') {
          // window.location.href = '/login';
          console.warn("Unauthorized Access - Redirecting to login is needed.");
        }
        break;
      
      case 403:
        console.error('Forbidden Access:', error.response.data);
        break;

      case 500:
        console.error('Internal Server Error:', error.response.data);
        break;

      default:
        console.error(`Unexpected Error (${error.response.status}):`, error.response.data);
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;