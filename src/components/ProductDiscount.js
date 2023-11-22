import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
const ProductDiscount = () => {
    const products = [
        {
            imgSrc: 'img/product/discount/pd-3.jpg',
            category: 'Dried Fruit',
            name: 'Raisin’n’nuts',
            price: '$30.00',
            discountedPrice: '$36.00'
        },
        {
            imgSrc: 'img/product/discount/pd-2.jpg',
            category: 'Vegetables',
            name: 'Vegetables’package',
            price: '$30.00',
            discountedPrice: '$36.00'
        },
        {
            imgSrc: 'img/product/discount/pd-3.jpg',
            category: 'Dried Fruit',
            name: 'Mixed Fruitss',
            price: '$30.00',
            discountedPrice: '$36.00'
        },
        {
            imgSrc: 'img/product/discount/pd-4.jpg',
            category: 'Dried Fruit',
            name: 'Raisin’n’nuts',
            price: '$30.00',
            discountedPrice: '$36.00'
        },
        {
            imgSrc: 'img/product/discount/pd-5.jpg',
            category: 'Dried Fruit',
            name: 'Raisin’n’nuts',
            price: '$30.00',
            discountedPrice: '$36.00'
        },
        {
            imgSrc: 'img/product/discount/pd-6.jpg',
            category: 'Dried Fruit',
            name: 'Raisin’n’nuts',
            price: '$30.00',
            discountedPrice: '$36.00'
        },
        // Add other product data in a similar format
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Số slide hiển thị cùng một lúc
        slidesToScroll: 1, // Số slide cuộn khi di chuyển
        autoplay: true, // Tự động chuyển slide
        autoplaySpeed: 2000, // Thời gian chờ trước khi chuyển slide tiếp theo (miligiây)
        arrows: true, // Hiển thị mũi tên điều hướng
        responsive: [
            {
                breakpoint: 768, // Độ rộng màn hình khi thay đổi cấu hình slider
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            {/* <div className="col-lg-9 col-md-7"></div> */}
            <div className="product__discount">
                <div className="section-title product__discount__title">
                    <h2>Sale Off</h2>
                </div>
                <div className="row">
                    <div className="product__discount__slider owl-carousel">
                        <Slider {...settings}>
                            {products.map((product, index) => (
                                <div key={index} className="col-lg-4">
                                    <div className="product__discount__item">
                                        <div className="product__discount__item__pic set-bg" style={{ backgroundImage: `url("${product.imgSrc}  ")` }}>
                                            <div className="product__discount__percent">-20%</div>
                                            <ul className="product__item__pic__hover">
                                                
                                                <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__discount__item__text">
                                            <span>{product.category}</span>
                                            <h5><Link to="/product-detail">{product.name}</Link></h5>
                                            <div className="product__item__price">{product.price} <span>{product.discountedPrice}</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDiscount;
