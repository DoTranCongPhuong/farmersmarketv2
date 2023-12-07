import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCartData, updateCart } from '../service/API';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart = () => {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);

    const fetchCartData = async () => {
        try {
            const cartData = await getCartData();
            setCartItems(cartData.cartItems);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            toast.error('Có lỗi xảy ra khi lấy giỏ hàng!');
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const handleUpdateCart = async () => {
        try {
            await updateCart(cartItems);
            toast.success('Giỏ hàng đã được cập nhật thành công!');
            fetchCartData();
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật giỏ hàng:', error);
            toast.error('Có lỗi xảy ra khi cập nhật giỏ hàng!');
            fetchCartData();
        }
    };
    // Function to update quantity in the cart
    const handleQuantityChange = (productId, value) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: value };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    // Function to remove item from the cart
    const removeCartItem = productId => {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
    };

    // Calculate total price of items in the cart
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    };

    return (
        <section className="shoping-cart spad">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="shoping__product">{t('Products')}</th>
                                        <th>{t('Original price')}</th>
                                        <th>{t('Discount')}</th>
                                        <th>{t('Current Price')}</th>
                                        <th>{t('Quantity')}</th>
                                        <th>{t('Total')}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.productId}>
                                            <td className="shoping__cart__item">
                                                <img src={item.image[1]} style={{
                                                    wproductIdth: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '5px'
                                                }} alt={item.name} />
                                                <h5><Link to={`/product-detail/${item.productId}`}>{item.name}</Link></h5>
                                            </td>
                                            <td className="shoping__cart__price">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="shoping__cart__price">
                                                {item.discount.toFixed(1)}%
                                            </td>
                                            <td className="shoping__cart__price">
                                                ${item.discountPrice.toFixed(2)}
                                            </td>
                                            <td className="shoping__cart__quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            className="dec qtybtn"
                                                            onClick={() => {
                                                                if (item.quantity > 1) {
                                                                    handleQuantityChange(item.productId, item.quantity - 1);
                                                                }
                                                            }}
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                                        />
                                                        <span
                                                            className="inc qtybtn"
                                                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="shoping__cart__total">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <span className="icon_close" onClick={() => removeCartItem(item.productId)}></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping__cart__btns">
                            <a href="#" className="primary-btn cart-btn">{t('CONTINUE SHOPPING')}</a>
                            <button
                                className="primary-btn cart-btn cart-btn-right"
                                onClick={handleUpdateCart}>
                                <span className="icon_loading"></span>UPDATE CART
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="shoping__continue">
                            <div className="shoping__discount row">
                                <h5>{t('Discount Codes')}</h5>
                                <form action="#">
                                    <input type="text" className='form-group' placeholder={t('Enter your coupon code')} />
                                    <button type="submit" className="site-btn form-group">{t('APPLY COUPON')}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="shoping__checkout">
                            <h5>{t('Cart Total')}</h5>
                            <ul>
                                <li> {t('Subtotal')}<span>${calculateTotal()}</span></li>
                                <li>{t('Total')} <span>${calculateTotal()}</span></li>
                            </ul>
                            <Link to="/checkout-page" className="primary-btn">{t('PROCEED TO CHECKOUT')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ShoppingCart;
