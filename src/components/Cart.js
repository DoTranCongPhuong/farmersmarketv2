import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ShoppingCart = () => {
    const { t } = useTranslation();
    // Cart data initialization
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Vegetable’s Package',
            price: 55.00,
            quantity: 1,
            image: 'img/cart/cart-1.jpg'
        },
        {
            id: 2,
            name: 'Fresh Garden Vegetable',
            price: 39.00,
            quantity: 1,
            image: 'img/cart/cart-2.jpg'
        },
        {
            id: 3,
            name: 'Organic Bananas',
            price: 69.00,
            quantity: 1,
            image: 'img/cart/cart-3.jpg'
        }
        // ... add more items as needed
    ]);

    // Function to update quantity in the cart
    const handleQuantityChange = (id, value) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: value };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    // Function to remove item from the cart
    const removeCartItem = id => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
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
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="shoping__product">{t('Products')}</th>
                                        <th>{t('Price')}</th>
                                        <th>{t('Quantity')}</th>
                                        <th>{t('Total')}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="shoping__cart__item">
                                                <img src={item.image} alt={item.name} />
                                                <h5><Link to="/product-detail">{item.name}</Link></h5>
                                            </td>
                                            <td className="shoping__cart__price">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="shoping__cart__quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            className="dec qtybtn"
                                                            onClick={() => {
                                                                if (item.quantity > 1) {
                                                                    handleQuantityChange(item.id, item.quantity - 1);
                                                                }
                                                            }}
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                        />
                                                        <span
                                                            className="inc qtybtn"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
                                                <span className="icon_close" onClick={() => removeCartItem(item.id)}></span>
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
                            <a href="#" className="primary-btn cart-btn cart-btn-right">
                                <span className="icon_loading"></span>{t('UPDATE CART')}
                            </a>
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
