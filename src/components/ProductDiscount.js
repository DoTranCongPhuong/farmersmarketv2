import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import { addToCart, getDiscountProducts } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ProductDiscount = () => {
    const { t } = useTranslation();

    const [products, setProducts] = useState([
        {
            _id: "",
            name: "",
            category: "",
            description: "",
            descriptionDetail: "",
            discount: "",
            discountPrice: "",
            image: [],
            limitedProduct: "",
            originalPrice: "",
            totalWeight: "",
            unit: "",
            wholesalePrice: "",
        },
    ]);

    const handleAddToCart = async (itemId) => {
        try {
            // Gọi API add to cart khi click vào icon
            await addToCart(itemId, 1); // Thay đổi thông tin productId và quantity tùy theo cấu trúc dữ liệu của bạn

            // Hiển thị thông báo thành công khi thêm vào giỏ hàng
            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error('Error adding to cart:', error);
            // Hiển thị thông báo lỗi khi có lỗi xảy ra
            toast.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getDiscountProducts();
                setProducts(response.products)
                console.log(response.products)
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts(); // Gọi hàm để lấy dữ liệu khi component được mount
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Số slide hiển thị cùng một lúc
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
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* <div className="col-lg-9 col-md-7"></div> */}
            <div className="product__discount">
                <div className="section-title product__discount__title">
                    <h2 className='text-danger'>Flashsale</h2>
                </div>
                <div className="row">
                    <div className="product__discount__slider owl-carousel">
                        <Slider {...settings}>
                            {products.map((product, index) => (
                                <div key={index} className="col-lg-4">
                                    <div className="product__discount__item">
                                        <div
                                            className="product__discount__item__pic set-bg"
                                            style={{
                                                backgroundImage: `url("${product.image[0]}")`,
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <div className="product__discount__percent">{product.discount}%</div>
                                            <ul className="product__item__pic__hover">

                                                <li>
                                                    <a onClick={() => handleAddToCart(product._id)}>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product__discount__item__text">
                                            <span>{t(product.category)}</span>
                                            <h5><Link to={`/product-detail/${product._id}`}>{product.name}</Link></h5>
                                            <div className="product__item__price text-danger">{product.discountPrice.toLocaleString('vi-VN')}VND <span>{product.originalPrice.toLocaleString('vi-VN')}</span></div>
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
