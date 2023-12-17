import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { search, getCategoryData, addToCart, getProductList } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';
import LeftBar from './LeftBar'

const productsPerPage = 9; // Số sản phẩm trên mỗi trang

const ListProduct = () => {
    const [listProducts, setListProducts] = useState([]); // Khởi tạo listProducts là một mảng rỗng
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [priceFilter, setPriceFilter] = useState({
        min: 0,
        max: 999999,
    });
    const [ratingFilter, setRatingFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let productList = [];

                if (location.search) {
                    const searchParams = queryString.parse(location.search);
                    const searchTerm = searchParams.search;
                    const category = searchParams.category;

                    if (searchTerm) {
                        productList = await search(searchTerm);
                        setListProducts(productList);
                    } else if (category) {
                        productList = await getCategoryData(category);
                        setListProducts(productList.products);

                    }
                } else {
                    productList = await getProductList(currentPage, productsPerPage, 'price', 'desc');
                    setListProducts(productList.products);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location.search, currentPage]);

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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Lọc danh sách sản phẩm theo giá từ priceFilter.min đến priceFilter.max
    const filteredProducts = listProducts.filter(product => {
        return product.discountPrice >= priceFilter.min && product.discountPrice <= priceFilter.max;
    });
    console.log(priceFilter.min + ' '+priceFilter.max)

    // Lấy ra các sản phẩm hiện tại dựa trên trang và sản phẩm trên mỗi trang
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Tạo mảng số trang dựa trên số lượng sản phẩm phân trang
    const pageNumbers = [1, 2, '..'];
    for (let i = 1; i < Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleRatingFilter = (props) => {
        setRatingFilter(props);
    };

    const handlePriceFilter = (props) => {
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
                            <h2>List Products</h2>
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
                                                {product.discountPrice} $ <span>{product.discount == 0 ? '' : product.originalPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product__pagination">
                        {pageNumbers.map(number => (
                            <a key={number} onClick={() => paginate(number)}>
                                {number}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};


export default ListProduct;