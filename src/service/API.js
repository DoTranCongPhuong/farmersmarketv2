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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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


const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/user-info');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put('/update-user', userData,);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const changeUserPassword = async (currentPassword, newPassword) => {
  try {
    const response = await axiosInstance.post('/change-password', {
      currentPassword: currentPassword,
      newPassword: newPassword
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};



export { register, login, getUserInfo, updateUser, changeUserPassword, axiosInstance };

