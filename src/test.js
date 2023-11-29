import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = () => {
  const createOrder = async (data, actions) => {
    try {
      // Gửi yêu cầu tạo đơn hàng đến backend
      const response = await axios.post('https://www.example.com/create-order', {
        product: 'iPhone 5',
        price: 5000,
        currency: 'USD'
      });

      return response.data.orderID; // Trả về ID của đơn hàng từ backend để sử dụng cho thanh toán PayPal
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Could not create order');
    }
  };

  const paypalOptions = {
    'client-id': 'ASTFm2Ko8QcIv9SzITv2', // Client ID của bạn từ tài khoản PayPal Developer
    currency: 'USD',
    createOrder: createOrder,
    onApprove: async (data, actions) => {
      try {
        const orderID = await actions.order.capture(); // Capture đơn hàng khi người dùng xác nhận thanh toán
        // Xử lý khi giao dịch được xác nhận thành công
        console.log('Transaction completed for order ID: ' + orderID);
        // Gọi API backend để lưu trữ thông tin thanh toán và đơn hàng
        // Có thể gửi orderID và thông tin khác tới backend để lưu trữ
      } catch (error) {
        console.error('Error capturing order:', error);
        throw new Error('Could not capture order');
      }
    }
  };

  return (
    <PayPalScriptProvider options={{ 'data-client-token': 'YOUR_PAYPAL_CLIENT_TOKEN' }}>
      <PayPalButtons {...paypalOptions} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
