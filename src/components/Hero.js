import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const departmentsData = [
  'Fruits',
  'Vegetables',
  'Local specialty foods',
  'Organic food',
  'Pices and seeds',
  'Others',
];

const HeroSection = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [showCategories, setShowCategories] = useState(true); // Ban đầu set là true vì đang ở trang home

  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại và cập nhật activeLink
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Theo dõi thay đổi của activeLink và cập nhật showCategories tương ứng
  React.useEffect(() => {
    setShowCategories(activeLink === '/');
  }, [activeLink]);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };


  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all" onClick={toggleCategories}>
                <i className="fa fa-bars"></i>
                <span>All Categories</span>
              </div>
              <ul style={{ display: showCategories ? 'block' : 'none' }}>
                {departmentsData.map((department, index) => (
                  <li key={index}>
                    <a href="#">{department}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form action="#">
                  <input type="text" placeholder="What do you need?" />
                  <button type="submit" className="site-btn">SEARCH</button>
                </form>
              </div>
              <a href="https://zalo.me/+84898537761">
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+84 898.537.761</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </a>
            </div>
            <div className="hero__item set-bg align-items-center" style={{
              display: activeLink === '/' ? 'flex' : 'none',
              backgroundImage: 'url("img/hero/banner.jpg")'
            }}>
              <div className="hero__text ">
                <span>FRUIT FRESH</span>
                <h2>Vegetable <br />100% Organic</h2>
                <p>Free Pickup and Delivery Available</p>
                <Link to='/products-page'><button className="site-btn">SHOP NOW</button></Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
