import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserVoucherList } from '../service/API';
import Slider from 'react-slick';


const Header = () => {
  useEffect(() => {
    // Kiểm tra xem URL có chứa '/success' không
    if (window.location.href.includes('/success')) {
      // Nếu URL có '/success', hiển thị thông báo "Thanh toán thành công" bằng alert
      alert('Thanh toán thành công');
    }
  }, []);

  useEffect(() => {
    if (window.location.href.includes('/failure')) {
      // Nếu URL có '/success', hiển thị thông báo "Thanh toán thành công" bằng alert
      alert('Thanh toán thất bại');
    }
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    arrows: true,
    dots: false,
  };
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Mã ngôn ngữ mặc định
  const [userVoucherList, setUserVoucherList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy danh sách voucher người dùng khi component được tải
        const vouchers = await getUserVoucherList();
        setUserVoucherList(vouchers.vouchers);
      } catch (error) {
        console.error('Error fetching user vouchers:', error);
        // Xử lý lỗi nếu cần
      }
    };

    fetchData(); // Gọi hàm fetchData để lấy dữ liệu khi component được tải
  }, []); // Tham số truyền vào useEffect là một mảng rỗng để chỉ thực hiện effect này một lần khi component được tải
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

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Đã copy voucher: ' + code);
      })
      .catch(err => {
        console.error('Lỗi khi sao chép voucher:', err);
      });
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
            <li className={activeLink === '/history-page' ? 'active' : ''}><Link to="/history-page">{t('Purchase history')}</Link></li>
            <li className={activeLink === '/contact-page' ? 'active' : ''}><Link to="/contact-page">{t('Contact')}</Link></li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li><i className="fa fa-envelope"></i>farmmersmarket@example.com </li>
            <li className="banner-list-slider">
              {userVoucherList.map(banner => (
                <div key={banner.code}>
                  <span>
                    <h3>Code: {banner.code}</h3>
                    <p>Discount: {banner.discount}%</p>
                    <p>Start Date: {new Date(banner.startDate).toLocaleDateString()}</p>
                    <p>Expiration Date: {new Date(banner.expirationDate).toLocaleDateString()}</p>
                  </span>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-9">
                <div className="header__top__left">
                  <ul className='d-flex' >
                    <li><i className="fa fa-envelope"></i> farmmersmarket@example.com</li>
                    <div
                      className='col-8 text-danger'
                    >
                      <Slider {...settings}>
                        {userVoucherList.map(banner => (
                          <span key={banner.code}
                            onClick={() => handleCopyCode(banner.code)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}>
                            Voucher: {banner.code} - {banner.discount}% - {new Date(banner.startDate).toLocaleDateString()}-{new Date(banner.expirationDate).toLocaleDateString()}
                          </span>
                        ))}
                      </Slider>
                    </div>

                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-3">
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
                <li className={activeLink === '/history-page' ? 'active' : ''}><Link to="/history-page">{t('Purchase history')}</Link></li>
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
