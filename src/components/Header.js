import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại và cập nhật activeLink
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);


  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li><i className="fa fa-envelope"></i> farmmersmarket@example.com</li>
                  <li>Free Shipping for all Order of $99</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                </div>
                <div className="header__top__right__language">
                  <img src="img/language.png" alt="" />
                  <div>English</div>
                  <span className="arrow_carrot-down"></span>
                  <ul>
                    <li><a href="#">Spanis</a></li>
                    <li><a href="#">English</a></li>
                  </ul>
                </div>
                <div className="header__top__right__auth">
                  <Link to="/login"><i className="fa fa-user"></i> {localStorage.getItem('token') ? 'My Account' : 'Login'}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="header__logo">
              <a><Link to="/"><img src="img/logo.png" alt="" /></Link></a>
            </div>
          </div>
          <div className="col-lg-5">
            <nav className="header__menu">
              <ul>
                <li className={activeLink === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
                <li className={activeLink === '/products-page' ? 'active' : ''}><Link to="/products-page">Shop</Link></li>
                <li>
                  <Link to="#">Pages</Link>
                  <ul className="sub-menu">
                    <ul class="header__menu__dropdown">
                      <li><a><Link to="/shop-details">Shop Details</Link></a></li>
                      <li><a><Link to="/cart-page">Shopping Cart</Link></a></li>
                      <li><a><Link to="/checkout">Check Out</Link></a></li>
                      <li><a><Link to="/blog-details">Blog Details</Link></a></li>
                    </ul>
                  </ul>
                </li>
                {/* <li><Link to="/blog">Blog</Link></li> */}
                <li className={activeLink === '/contact' ? 'active' : ''}><Link to="/contact-page">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                <li><a><Link to="/cart-page"><i className="fa fa-shopping-bag"></i></Link></a></li>
              </ul>
              <div className="header__cart__price">item: <span>$150.00</span></div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
