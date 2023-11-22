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
import { HomePage, ProductsPage, ProductDetailPage, CartPage,
        LoginPage, ContactPage, CheckoutPage, RegisterPage, UserPage } from './routes/Routes';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products-page" element={<ProductsPage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
