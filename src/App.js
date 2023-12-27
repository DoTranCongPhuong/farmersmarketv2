import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/bootstrap.min.css';
import './css/elegant-icons.css';
import './css/font-awesome.min.css';
import './css/nice-select.css';
import './css/slicknav.min.css';
import './css/style.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage, ProductsPage, ProductDetailPage, CartPage,
  LoginPage, ContactPage, CheckoutPage, RegisterPage, UserPage,
  SellerPage
} from './routes/Routes';
import PrivateRoute from './routes/PrivateRoute';
import HistoryPage from './page/HistoryPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Payment from './components/Payment';


const App = () => {

  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/success" element={<Payment />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/history-page" element={<PrivateRoute component={HistoryPage} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products-page" element={<ProductsPage />} />
          <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
          <Route path="/cart-page" element={<PrivateRoute component={CartPage} />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route path="/user-page" element={<PrivateRoute component={UserPage} />} />
          <Route path="/seller-page/:farmerId" element={<SellerPage />} />
        </Routes>
        <Footer />
      </Router>
  );
};

export default App;
