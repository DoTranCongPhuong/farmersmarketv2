import axios from 'axios';

const BASE_URL = 'https://farmer-ecommerce-m4j8.vercel.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server Response Error:', error.response.data);
      console.error('Server Response Status:', error.response.status);
      console.error('Server Response Headers:', error.response.headers);
      throw new Error('Server Response Error');
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error during request setup:', error.message);
      throw new Error('Error during request setup');
    }
  }


};
const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/login', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server Response Error:', error.response.data);
      console.error('Server Response Status:', error.response.status);
      console.error('Server Response Headers:', error.response.headers);
      throw new Error('Server Response Error');
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error during request setup:', error.message);
      throw new Error('Error during request setup');
    }
  }
};

const getUserInfo = async (userId, accessToken) => {
  try {
    const response = await axiosInstance.get(`/get-user-info/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server Response Error:', error.response.data);
      console.error('Server Response Status:', error.response.status);
      console.error('Server Response Headers:', error.response.headers);
      throw new Error('Server Response Error');
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error during request setup:', error.message);
      throw new Error('Error during request setup');
    }
  }
};



export { register, login , getUserInfo};

