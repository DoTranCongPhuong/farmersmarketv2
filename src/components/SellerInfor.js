import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFarmerInfoById, addToCart, axiosInstance } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Icon } from 'semantic-ui-react';



const SellerInfor = () => {
    const { t } = useTranslation();

    const { farmerId } = useParams();
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('/loading.gif');
    const [featuredItems, setFeaturedItems] = useState([]);
    const [star, setStar] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFarmerInfoById(farmerId); // Pass farmerId to your API call
                setUser(data.farmerDetails);
                setAvatar(data.farmerDetails.image || './user.png');
                setFeaturedItems(data.farmerProducts); // Đặt dữ liệu từ API vào state
                setStar(data.averageRate)
            } catch (error) {
                console.error('Error fetching user information:', error);
                toast.error('Failed to load data, please log in again');
            }
        };
        fetchData();
    }, [farmerId]);


    const [filter, setFilter] = useState('*');

    const handleFilter = (filterType) => {
        setFilter(filterType); // Update the filter state based on the selected filter type
    };
    const filteredItems = filter === '*' ? featuredItems : featuredItems.filter(item => item.category.includes(filter));
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

    const renderStars = (averageRating) => {
        const stars = [];
        const maxStars = 5; // Số sao tối đa là 5
        const roundedRating = Math.min(Math.round(averageRating * 2) / 2, maxStars); // Làm tròn đến 0.5 gần nhất và giới hạn tối đa là 5 sao

        // Thêm các sao vào mảng
        for (let i = 0; i < maxStars; i++) {
            let starName, starColor;

            if (i < roundedRating) {
                if (i < roundedRating - 0.5) {
                    starName = 'star';
                    starColor = 'yellow';
                } else {
                    starName = 'star half';
                    starColor = 'yellow';
                }
            } else {
                starName = 'star outline';
                starColor = 'black';
            }

            stars.push(
                <Icon
                    key={`star-${i}`}
                    size='large'
                    name={starName}
                    color={starColor}
                />
            );
        }

        // Trả về JSX hiển thị sao
        return (
            <div className='mb-3'>
                {stars.map((star, index) => (
                    <span key={index}>{star}</span>
                ))}
            </div>
        );
    };


    const renderUserInfo = () => {
        const formattedAddress = `${user.addressDetail}, ${user.street}, ${user.ward}, ${user.district}, ${user.city}, ${user.country}`;
        return (
            user && (
                <>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Name of Farmer')}</p>
                            <div>{`${user.lastName} ${user.firstName}`}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Email')}</p>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Number Phone')}</p>
                            <div>{user.numberPhone}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Address')}</p>
                            <div>{formattedAddress}</div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="checkout__input">
                            <p>{t('Introducing farmers')}</p>
                            <div>{user.description}</div>
                        </div>
                    </div>
                </>
            )
        );
    };
    return (
        <>
            <section className="checkout spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="checkout__form">
                                <h3>{t('Farmer Profile')}</h3>
                                <div className="container mt-4 row">
                                    <div className="text-center mb-4">
                                        <img
                                            src={avatar}
                                            alt={t('Avatar Preview')}
                                            className="img-thumbnail"
                                        />
                                        {renderStars(star)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                            <div className="checkout__form">
                                <h4>{t('User Information')}</h4>
                                <div className="row">{renderUserInfo()}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
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
                                <h2>{t('Latest products')}</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    <li className={filter === '*' ? 'active' : ''} onClick={() => handleFilter('*')} data-filter="*">{t('All')}</li>
                                    <li className={filter === 'Fruits' ? 'active' : ''} onClick={() => handleFilter('Fruits')} data-filter=".Fruits">{t('Fruits')}</li>
                                    <li className={filter === 'Vegetables' ? 'active' : ''} onClick={() => handleFilter('Vegetables')} data-filter=".Vegetables">{t('Vegetables')}</li>
                                    <li className={filter === 'Local specialty foods' ? 'active' : ''} onClick={() => handleFilter('Local specialty foods')} data-filter=".Local-specialty-foods">{t('Local specialty foods')}</li>
                                    <li className={filter === 'Organic food' ? 'active' : ''} onClick={() => handleFilter('Organic food')} data-filter=".Organic-food">{t('Organic food')}</li>
                                    <li className={filter === 'Pices and seeds' ? 'active' : ''} onClick={() => handleFilter('Pices and seeds')} data-filter=".Pices-and-seeds">{t('Pices and seeds')}</li>
                                </ul>

                            </div>
                        </div>
                        <div className="row featured__filter">
                            {filteredItems.map((item, index) => (
                                <div key={index} className={`col-lg-3 col-md-4 col-sm-6 mix ${item.category}`}>
                                    <div className="featured__item">
                                        <div className="featured__item__pic set-bg" style={{
                                            backgroundImage: `url(${item.image[0]})`,
                                            borderRadius: '10px',
                                        }}>
                                            <ul className="featured__item__pic__hover">
                                                <li>
                                                    <a onClick={() => handleAddToCart(item.id)}>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="featured__item__text">
                                            <h6><Link to={`/product-detail/${item._id}`}>{item.name}</Link></h6>
                                            <h6>{item.discountPrice.toLocaleString('vi-VN')}VND</h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default SellerInfor;
