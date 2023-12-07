import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import categoryList from "../BaseData/CategoryList";


const HeroSection = () => {
  const { t } = useTranslation();

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

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); // Ngăn chặn việc tải lại trang khi submit form
    navigate(`/products-page?search=${searchTerm}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all" onClick={toggleCategories}>
                <i className="fa fa-bars"></i>
                <span>{t('All Categories')}</span>
              </div>
              <ul style={{ display: showCategories ? 'block' : 'none' }}>
                {categoryList.map((categoryList, index) => (
                  <li key={index}>
                    <Link to={`/products-page?category=${categoryList.category}`}>{categoryList.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder={t('What do you need?')}
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="site-btn">{t('SEARCH')}</button>
                </form>
              </div>
            </div>
            <div className="hero__item set-bg align-items-center" style={{
              display: activeLink === '/' ? 'flex' : 'none',
              backgroundImage: 'url("img/hero/banner.jpg")'
            }}>
              <div className="hero__text ">
                <span>{t('FRUIT FRESH')}</span>
                <h2> {t('Vegetable')}<br />100% {t('Organic')}</h2>
                <p>{t('Free Pickup and Delivery Available')}</p>
                <Link to='/products-page'><button className="site-btn">{t('SHOP NOW')}</button></Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
