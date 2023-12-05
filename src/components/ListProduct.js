import React, {useState} from 'react';
import { Link } from 'react-router-dom';


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


const productsPerPage = 10; // Số sản phẩm trên mỗi trang

const ListProduct = () => {
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
                                        <li><Link to={`/product-detail/${product.id}`}><i className="fa fa-shopping-cart"></i></Link></li>
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
                    <a key={number}  onClick={() => paginate(number)}>
                        {number}
                    </a>
                ))}
            </div>
        </div>
    );
};


export default ListProduct;