import React, { useState } from 'react';

const departmentsData = [
  'Fresh Meat',
  'Vegetables',
  'Fruit & Nut Gifts',
  'Fresh Berries',
  'Ocean Foods',
  'Butter & Eggs',
  'Fastfood',
  'Fresh Onion',
  'Papayaya & Crisps',
  'Oatmeal',
  'Fresh Bananas'
];

const HeroSection = () => {
  const [showCategories, setShowCategories] = useState(true);

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
                <span>All departments</span>
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
                  {/* <div className="hero__search__categories">
                    All Categories
                    <span className="arrow_carrot-down"></span>
                  </div> */}
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
            <div className="hero__item set-bg" style={{ backgroundImage: 'url("img/hero/banner.jpg")' }}>
              <div className="hero__text">
                <span>FRUIT FRESH</span>
                <h2>Vegetable <br />100% Organic</h2>
                <p>Free Pickup and Delivery Available</p>
                <a href="#" className="primary-btn">SHOP NOW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
