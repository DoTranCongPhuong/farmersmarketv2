import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Mã ngôn ngữ mặc định

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng); // Cập nhật ngôn ngữ đã chọn
    setShowLanguages(false); // Ẩn danh sách ngôn ngữ sau khi chọn
  };

  // Kiểm tra đường dẫn hiện tại và cập nhật activeLink
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <>
      <div onClick={handleShowMenu} className={`humberger__menu__overlay ${showMenu ? 'active' : ''}`}></div>
      <div className={`humberger__menu__wrapper ${showMenu ? 'show__humberger__menu__wrapper' : ''}`}>
        <div className="humberger__menu__logo">
          <a href="#"><img src="img/logo.png" alt="" /></a>
        </div>
        <div className="humberger__menu__cart d-flex justify-content-center align-items-center">
          <ul>
            <Link to="/cart-page"><i className="fa fa-shopping-bag m-3 fa-2x" style={{ color: 'black' }}></i></Link>
          </ul>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__language">
            <img
              src={`/img/${selectedLanguage === 'en' ? 'english' : 'vietnam'}.png`}
              style={{ height: '17px', width: '24px', objectFit: 'cover' }}
              alt=""
            />
            <div onClick={() => setShowLanguages(!showLanguages)}>
              {selectedLanguage === 'en' ? 'English' : 'Việt Nam'}
            </div>
            <span className="arrow_carrot-down"></span>
            {showLanguages && (
              <ul>
                <li onClick={() => changeLanguage('en')}>English</li>
                <li onClick={() => changeLanguage('vi')}>Việt Nam</li>
              </ul>
            )}
          </div>
          <div className="header__top__right__auth">
            {
              localStorage.getItem('token') ?
                <Link to="/login"> <i className="fa fa-user"></i>  {t('My account')}</Link> :
                <Link to="/user-page"><i className="fa fa-user"></i>  {t('Login')}</Link>
            }
          </div>
        </div>
        <nav className="slicknav_nav ">
          <ul>
            <li className={activeLink === '/' ? 'active' : ''}><Link to="/">{t('Home')}</Link></li>
            <li className={activeLink === '/products-page' ? 'active' : ''}><Link to="/products-page">{t('Shop')}</Link></li>
            <li>
              <Link to="#">{t('Pages')}</Link>
            </li>
            {/* <li><Link to="/blog">Blog</Link></li> */}
            <li className={activeLink === '/contact-page' ? 'active' : ''}><Link to="/contact-page">{t('Contact')}</Link></li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li><i className="fa fa-envelope"></i>farmmersmarket@example.com </li>
            <li>{t('Free Shipping for all Order of $99')}</li>
          </ul>
        </div>
      </div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li><i className="fa fa-envelope"></i> farmmersmarket@example.com</li>
                    <li>{t('Free Shipping for all Order of $99')}</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__language">
                    <img
                      src={`/img/${selectedLanguage === 'en' ? 'english' : 'vietnam'}.png`}
                      style={{ height: '17px', width: '24px', objectFit: 'cover' }}
                      alt=""
                    />
                    <div onClick={() => setShowLanguages(!showLanguages)}>
                      {selectedLanguage === 'en' ? 'English' : 'Việt Nam'}
                    </div>
                    <span className="arrow_carrot-down"></span>
                    {showLanguages && (
                      <ul>
                        <li onClick={() => changeLanguage('en')}>English</li>
                        <li onClick={() => changeLanguage('vi')}>Việt Nam</li>
                      </ul>
                    )}
                  </div>
                  <div className="header__top__right__auth">
                    {
                      localStorage.getItem('token') ?
                        <Link to="/login"> <i className="fa fa-user"></i> {t('My account')} </Link> :
                        <Link to="/user-page"><i className="fa fa-user"></i>  {t('Login')}</Link>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <a><Link to="/"><img src="img/logo.png" alt="" /></Link></a>
              </div>
            </div>
            <nav className="col-lg-6 d-flex header__menu justify-content-center align-items-center">
              <ul>
                <li className={activeLink === '/' ? 'active' : ''}><Link to="/">{t('Home')}</Link></li>
                <li className={activeLink === '/products-page' ? 'active' : ''}><Link to="/products-page">{t('Shop')}</Link></li>
                <li>
                  <Link to="#">{t('Pages')}</Link>
                  <ul className="sub-menu">
                    <ul class="header__menu__dropdown">
                      <li><a><Link to="/shop-details">{t('Shop Details')}</Link></a></li>
                      <li><a><Link to="/cart-page">{t('Shopping Cart')}</Link></a></li>
                      <li><a><Link to="/checkout">{t('Check Out')}</Link></a></li>
                      <li><a><Link to="/blog-details">{t('Blog Details')}</Link></a></li>
                    </ul>
                  </ul>
                </li>
                {/* <li><Link to="/blog">Blog</Link></li> */}
                <li className={activeLink === '/contact-page' ? 'active' : ''}><Link to="/contact-page">{t('Contact')}</Link></li>
              </ul>
            </nav>
            <div className="col-lg-3 d-flex justify-content-center align-items-center">
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                <Link to="/cart-page"><i className="fa fa-shopping-bag m-3" style={{ color: 'black' }}></i></Link>
                </div>
              </div>
              <a href="https://zalo.me/+84898537761">
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+84 898.537.761</h5>
                    <span>{t('support 24/7 time')}</span>
                  </div>
                </div>
              </a>

            </div>
          </div>
          <button onClick={handleShowMenu} className="humberger__open">
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </header>
    </>

  );
};

export default Header;
