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
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all" onClick={handleToggle}>
                <i className="fa fa-bars"></i>
                <span>All departments</span>
              </div>
              <ul className={` ${isToggled ? 'slideToggle' : ''}`}>
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
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="hero__search__phone__text">
                  <h5>+65 11.188.888</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
