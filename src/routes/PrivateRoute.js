import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('token'); 
  return isLoggedIn !== null; // Kiểm tra nếu token tồn tại thì xem như đã đăng nhập
};

// Tạo một PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
