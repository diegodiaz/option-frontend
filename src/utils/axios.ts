import axios from 'axios';

// ----------------------------------------------------------------------

const urlApi = process.env.REACT_APP_URL_API || '';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (response) => {
  response.baseURL = urlApi;
  return response;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
