import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import featuredItems from "../BaseData/FeaturedItems";
import { addToCart } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeaturedItems = () => {
    // Sample data object (you can replace this with your actual data)
    const [filter, setFilter] = useState('*'); // Initial filter state, '*' means showing all items
    const handleFilter = (filterType) => {
        setFilter(filterType); // Update the filter state based on the selected filter type
    };
    const filteredItems = filter === '*' ? featuredItems : featuredItems.filter(item => item.category.includes(filter));
    const handleAddToCart = async (itemId) => {
        try {
            // Gọi API add to cart khi click vào icon
            await addToCart('6564eb2812062f864554ea1d', 1); // Thay đổi thông tin productId và quantity tùy theo cấu trúc dữ liệu của bạn

            // Hiển thị thông báo thành công khi thêm vào giỏ hàng
            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error('Error adding to cart:', error);
            // Hiển thị thông báo lỗi khi có lỗi xảy ra
            toast.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!');
        }
    };
    return (
        <section className="featured spad">
            <ToastContainer
                position="top-left"
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
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Featured Product</h2>
                        </div>
                        <div className="featured__controls">
                            <ul>
                                <li className={filter === '*' ? 'active' : ''} onClick={() => handleFilter('*')} data-filter="*">All</li>
                                <li className={filter === 'Fruits' ? 'active' : ''} onClick={() => handleFilter('Fruits')} data-filter=".Fruits">Fruits</li>
                                <li className={filter === 'Vegetables' ? 'active' : ''} onClick={() => handleFilter('Vegetables')} data-filter=".Vegetables">Vegetables</li>
                                <li className={filter === 'Local specialty foods' ? 'active' : ''} onClick={() => handleFilter('Local specialty foods')} data-filter=".Local-specialty-foods">Local specialty foods</li>
                                <li className={filter === 'Organic food' ? 'active' : ''} onClick={() => handleFilter('Organic food')} data-filter=".Organic-food">Organic food</li>
                                <li className={filter === 'Pices and seeds' ? 'active' : ''} onClick={() => handleFilter('Pices and seeds')} data-filter=".Pices-and-seeds">Pices and seeds</li>
                            </ul>

                        </div>
                    </div>
                    <div className="row featured__filter">
                        {filteredItems.map((item, index) => (
                            <div key={index} className={`col-lg-3 col-md-4 col-sm-6 mix ${item.category}`}>
                                <div className="featured__item">
                                    <div className="featured__item__pic set-bg" style={{ backgroundImage: `url(${item.image})` }}>
                                        <ul className="featured__item__pic__hover">
                                            <li>
                                                <a onClick={() => handleAddToCart(item.id)}>
                                                    <i className="fa fa-shopping-cart"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6><Link to={`/product-detail/${item.id}`}>{item.name}</Link></h6>
                                        <h5>{item.price}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedItems;
