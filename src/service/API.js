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

export const getProductReviews = async (productId) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}/reviews`);
    return response.data; // Trả về dữ liệu từ response nếu yêu cầu thành công
  } catch (error) {
    throw new Error(error.response.data); // Ném ra một lỗi với dữ liệu từ response nếu yêu cầu thất bại
  }
};

export const postReview = async (reviewData) => {
  try {
    console.log(reviewData)
    const response = await axiosInstance.post('/reviews', reviewData);
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the response data if request fails
  }
};


export const updateCart = (cartItems) => {
  return axiosInstance.put('update-cart', { cartItems })
    .then(response => {
      // Xử lý kết quả nếu cần thiết
      return response.data; // Hoặc return một giá trị khác tuỳ theo cần thiết
    })
    .catch(error => {
      // Xử lý lỗi nếu cần thiết
      throw error; // Hoặc xử lý lỗi và trả về một giá trị khác
    });
};


export const getCartData = async () => {
  try {
    const response = await axiosInstance.get('/cart');
    return response.data; // Trả về dữ liệu từ phản hồi của API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching cart data:', error);
    throw error; // Ném lại lỗi để component có thể xử lý
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axiosInstance.post('/add-to-cart', {
      productId: productId,
      quantity: quantity,
    });

    return response.data; // Trả về dữ liệu từ API nếu cần
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error; // Xử lý lỗi hoặc ném lỗi để xử lý ở mức cao hơn
  }
};

export const getCategoryData = async (category) => {
  try {
    const response = await axiosInstance.get(`/category?category=${category}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu danh mục:', error);
    throw error; // Xử lý lỗi hoặc ném lỗi để xử lý ở mức cao hơn
  }
};

const search = async (query) => {
  try {
    const response = await axiosInstance.get(`/search?search=${query}`);
    return response.data; // Giả sử phản hồi chứa dữ liệu bạn cần
  } catch (error) {
    // Xử lý các trường hợp lỗi
    if (error.response) {
      // Yêu cầu đã được thực hiện và máy chủ đã phản hồi với mã trạng thái nằm ngoài phạm vi của 2xx
      console.error('Lỗi phản hồi:', error.response.data);
      return null; // hoặc ném một lỗi, hoặc xử lý tùy thuộc vào từng trường hợp
    } else if (error.request) {
      // Yêu cầu đã được thực hiện nhưng không nhận được phản hồi
      console.error('Không nhận được phản hồi:', error.request);
      return null; // hoặc ném một lỗi, hoặc xử lý tùy thuộc vào từng trường hợp
    } else {
      // Có điều gì đó xảy ra trong việc thiết lập yêu cầu gây ra lỗi
      console.error('Lỗi thiết lập yêu cầu:', error.message);
      return null; // hoặc ném một lỗi, hoặc xử lý tùy thuộc vào từng trường hợp
    }
  }
};


const getProductInfor = async (productId) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response.data; // Trả về dữ liệu của sản phẩm
  } catch (error) {
    // Xử lý lỗi ở đây nếu cần thiết
    console.error('Error fetching product information:', error);
    throw error;
  }
}

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

const sendContact = async (name, email, message) => {
  try {
    const response = await axiosInstance.post('/save-email', {
      content: message,
      title: name,
      email: email,
    });
    return response.data; // Return the response data if needed
  } catch (error) {
    throw new Error(error.response.data || error.message);
  }
};

export {
  register, login, getUserInfo, updateUser, changeUserPassword, axiosInstance, sendContact
  , getProductInfor, search
};

