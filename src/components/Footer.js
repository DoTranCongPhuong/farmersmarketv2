import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__about__logo">
                                <Link to="/"><img src="/img/logo.png" alt="" /></Link>
                            </div>
                            <ul>
                                <li>{t('Address: 01 Vo Van Ngan, Linh Chieu ward, Thu Duc city')}</li>
                                <li>Phone: +84 123456789 </li>
                                <li>Email: fammer@example.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                        <div className="footer__widget">
                            <h6>{t('Useful Links')}</h6>
                            <ul>
                                <li><a href="#">{t('About Us')}</a></li>
                                <li><a href="#">{t('About Our Shop')}</a></li>
                                <li><a href="#">{t('Secure Shopping')}</a></li>
                                <li><a href="#">{t('Delivery infomation')}</a></li>
                                <li><a href="#">{t('Privacy Policy')}</a></li>
                                <li><a href="#">{t('Our Sitemap')}</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">{t('Who We Are')}</a></li>
                                <li><a href="#">{t('Our Services')}</a></li>
                                <li><a href="#">{t('Projects')}</a></li>
                                <li><a href="#">{t('Contact')}</a></li>
                                <li><a href="#">{t('Innovation')}</a></li>
                                <li><a href="#">{t('Testimonials')}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                            <h6>{t('Join Our Newsletter Now')}</h6>
                            <p>{t('Get E-mail updates about our latest shop and special offers.')}</p>
                            <form action="#">
                                <input type="text" placeholder={t('Enter your mail')} />
                                <button type="submit" className="site-btn">{t('SUBSCRIBE')}</button>
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
