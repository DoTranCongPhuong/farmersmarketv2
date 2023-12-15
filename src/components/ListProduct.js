import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { search, getCategoryData, addToCart } from '../service/API';
import { toast, ToastContainer } from 'react-toastify';

const productsPerPage = 9; // Số sản phẩm trên mỗi trang

const ListProduct = () => {
    const [listProducts, setListProducts] = useState([]); // Khởi tạo listProducts là một mảng rỗng
    const location = useLocation();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = queryString.parse(location.search);
                const searchTerm = searchParams.search;
                const category = searchParams.category; // Lấy giá trị category từ URL

                let listRessult;
                if (searchTerm) {
                    listRessult = await search(searchTerm);
                } else if (category) {
                    // Nếu có category từ URL, lấy dữ liệu danh mục tương ứng
                    listRessult = await getCategoryData(category);
                }

                if (listRessult) {
                    console.log(listRessult);
                    setListProducts(listRessult);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location.search]);
    const products = [
        {
            id: 1,
            imageUrl: 'img/product/product-1.jpg',
            discount: '-20%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$30.00',
            oldPrice: '$36.00'
        },
        {
            id: 2,
            imageUrl: 'img/product/product-2.jpg',
            discount: '-15%',
            productName: 'Vegetables',
            productNameLink: 'Vegetables’package',
            price: '$28.00',
            oldPrice: '$33.00'
        },
        {
            id: 3,
            imageUrl: 'img/product/product-3.jpg',
            discount: '-25%',
            productName: 'Dried Fruit',
            productNameLink: 'Mixed Fruitss',
            price: '$32.00',
            oldPrice: '$42.00'
        },
        {
            id: 4,
            imageUrl: 'img/product/product-4.jpg',
            discount: '-10%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$25.00',
            oldPrice: '$30.00'
        },
        {
            id: 5,
            imageUrl: 'img/product/product-5.jpg',
            discount: '-18%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$27.00',
            oldPrice: '$33.00'
        },
        {
            id: 6,
            imageUrl: 'img/product/product-6.jpg',
            discount: '-22%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$29.00',
            oldPrice: '$37.00'
        },
        {
            id: 7,
            imageUrl: 'img/product/product-7.jpg',
            discount: '-30%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$20.00',
            oldPrice: '$28.00'
        },
        {
            id: 8,
            imageUrl: 'img/product/product-8.jpg',
            discount: '-15%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$26.00',
            oldPrice: '$30.00'
        },
        {
            id: 9,
            imageUrl: 'img/product/product-9.jpg',
            discount: '-28%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$22.00',
            oldPrice: '$30.00'
        },
        {
            id: 10,
            imageUrl: 'img/product/product-10.jpg',
            discount: '-20%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$28.00',
            oldPrice: '$35.00'
        },
        {
            id: 11,
            imageUrl: 'img/product/product-11.jpg',
            discount: '-12%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$24.00',
            oldPrice: '$27.00'
        },
        {
            id: 12,
            imageUrl: 'img/product/product-12.jpg',
            discount: '-18%',
            productName: 'Dried Fruit',
            productNameLink: 'Raisin’n’nuts',
            price: '$26.00',
            oldPrice: '$32.00'
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);

    // Tính chỉ số sản phẩm bắt đầu và kết thúc cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            <div className="product__discount">
                <div className="section-title product__discount__title">
                    <h2>List Products</h2>
                </div>
                <div className="row">
                    {currentProducts.map(product => (
                        <div key={product.id} className="col-lg-4">
                            <div className="product__discount__item">
                                <div className="product__discount__item__pic set-bg" style={{ backgroundImage: `url("${product.imageUrl}")` }}>
                                    <ul className="product__item__pic__hover">
                                        <li>
                                            <a onClick={() => handleAddToCart(product.id)}>
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__discount__item__text">
                                    <span>{product.productNameLink}</span>
                                    <h5><Link to={`/product-detail/${product.id}`}>{product.productName}</Link></h5>
                                    <div className="product__item__price">
                                        {product.price} <span>{product.oldPrice}</span>
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
    );
};


export default ListProduct;