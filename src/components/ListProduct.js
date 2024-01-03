import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { search, getCategoryData, addToCart, getProductList } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';
import LeftBar from './LeftBar';
import { useTranslation } from 'react-i18next';

const productsPerPage = 12;

const ListProduct = () => {
    const { t } = useTranslation();
    const [listProducts, setListProducts] = useState([]);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: 999999 });
    const [ratingFilter, setRatingFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = queryString.parse(location.search);
                const { search: searchTerm, category } = searchParams;

                let productsData = {};

                if (searchTerm) {
                    productsData = await search(searchTerm);
                } else if (category) {
                    productsData = await getCategoryData(category);
                } else {
                    productsData = await getProductList(1, 100, 'price', 'desc');
                }

                setListProducts(productsData.products || productsData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location.search]); // Ensure this includes all variables from the hook that might change


    const handleAddToCart = async (itemId) => {
        try {
            await addToCart(itemId, 1);
            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!');
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = listProducts.filter(product => {
        return product.discountPrice >= priceFilter.min && product.discountPrice <= priceFilter.max;
    });

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const getPageNumbers = () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    };

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const handleRatingFilter = (props) => {
        setRatingFilter(props);
    };

    const handlePriceFilter = (props) => {
        if (props.min === '') props.min = 0;
        if (props.max === '') props.max = 999999;
        setPriceFilter(props);
    };

    return (
        <div className="py-3">
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
            <div className='row'>
                <div className='col-3'>
                    <LeftBar
                        handlePriceFilter={handlePriceFilter}
                        handleRatingFilter={handleRatingFilter}
                    />
                </div>
                <div className='col-9'>
                    <div className="product__discount">
                        <div className="section-title product__discount__title">
                            <h2> {t('List Products')}</h2>
                        </div>
                        <div className="row">
                            {currentProducts.map(product => (
                                <div key={product.id} className="col-lg-3 p-3">
                                    <div className="product__discount__item">
                                        <div className="product__discount__item__pic set-bg" style={{
                                            backgroundImage: `url("${product.image[0]}")`,
                                            borderRadius: '10px',
                                        }}>
                                            <ul className="product__item__pic__hover">
                                                <li>
                                                    <a onClick={() => handleAddToCart(product._id)}>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product__discount__item__text">
                                            <h5><Link to={`/product-detail/${product._id}`}>{product.name}</Link></h5>
                                            <div className="product__item__price text-danger">
                                                {product.discountPrice.toLocaleString('vi-VN')} VND <span>{product.discount === 0 ? '' : product.originalPrice.toLocaleString('vi-VN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product__pagination">
                        <a onClick={() => currentPage > 1 && paginate(currentPage - 1)}>&laquo;</a>
                        {getPageNumbers().map(number => (
                            <a key={number} className={(currentPage) == number ? 'active' : ''} onClick={() => paginate(number)}>
                                {number}
                            </a>
                        ))}
                        <a onClick={() => currentPage < getPageNumbers().length && paginate(currentPage + 1)}>&raquo;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
