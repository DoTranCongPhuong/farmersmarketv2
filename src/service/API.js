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

export const historyOrders = async () => {
  try {
    const response = await axiosInstance.get('/user-history-orders');
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('Error fetching history orders:', error);
  }
};

export const order = async (paymentMethod, voucherCode ) => {
  try {
    const response = await axiosInstance.post('/order', {
      paymentMethod,
      voucherCode
    });
    return response.data;
  } catch (error) {
    console.log(error)

  }
};

export const getUserVoucherList = async () => {
  try {
    const response = await axiosInstance.get('/user-voucher-list');
    return response.data; // Trả về dữ liệu từ phản hồi nếu thành công
  } catch (error) {
    console.log(error)
  }
};

export const applyVoucher = async (voucherCode) => {
  try {
    const response = await axiosInstance.post('/apply-voucher', {
      voucherCode: voucherCode,
    });
    return response.data

  } catch (error) {
    console.error('Error applying voucher:', error);
    // Xử lý lỗi nếu có
  }
};

export const getDiscountProducts = async () => {
  try {
    const response = await axios.get('https://farmer-ecommerce-m4j8.vercel.app/flashsale');
    // Xử lý dữ liệu từ response
    return response.data; // Trả về dữ liệu từ yêu cầu GET
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error getting discount products:', error.message);
    console.log(error)
  }

};


export const getProductList = async (page = 1, limit = 50, sortField = 'price', sortOrder = 'desc') => {
  try {
    const response = await axiosInstance.get(`/products?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.log(error)
  }
};

export const getUserInfoById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-info/${userId}`);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.log(error)
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axiosInstance.delete(`/delete-review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/update-review/${reviewId}`, updatedData);
    return response.data; // Trả về dữ liệu sau khi cập nhật thành công (nếu cần)
  } catch (error) {
    console.log(error)
  }
};

export const getProductReviews = async (productId) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}/reviews`);
    return response.data; // Trả về dữ liệu từ response nếu yêu cầu thành công
  } catch (error) {
    console.log(error)
  }
};

export const postReview = async (reviewData) => {
  try {
    console.log(reviewData)
    const response = await axiosInstance.post('/reviews', reviewData);
    return response.data; // Return the response data
  } catch (error) {
    console.log(error)
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
      console.log(error)
    });
};


export const getCartData = async () => {
  try {
    const response = await axiosInstance.get('/cart');
    return response.data; // Trả về dữ liệu từ phản hồi của API
  } catch (error) {
    console.error('Error fetching cart data:', error);
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
  }
};

export const getCategoryData = async (category) => {
  try {
    const response = await axiosInstance.get(`/category?category=${category}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu danh mục:', error);
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
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error during request setup:', error.message);
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
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error during request setup:', error.message);
    }
  }
};


const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/user-info');
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put('/update-user', userData,);
    return response.data;
  } catch (error) {
    console.log(error)

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
    console.log(error)

  }
};

const sendContact = async ( email, message) => {
  try {
    const response = await axiosInstance.post('/save-email', {
      content: message,
      email: email,
    });
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error)

  }
};

export {
  register, login, getUserInfo, updateUser, changeUserPassword, axiosInstance, sendContact
  , getProductInfor, search
};

