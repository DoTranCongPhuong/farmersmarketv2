import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCartData, updateCart, applyVoucher, order } from '../service/API';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart = () => {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentSelection = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };

    const handlePlaceOrder = async () => {


        if (selectedPayment) {
            try {
                const response = await order(selectedPayment, couponCode);

                if (response && response.approval_url) {
                    window.location.href = response.approval_url;
                    toast.success('Redirecting to payment gateway...');
                } else if (response.message) {
                    toast.success(response.message);
                } else {
                    window.location.href = response;
                }

            } catch (error) {
                toast.error('Failed to place order. Please try again.');
            }
        } else {
            toast.warning('Please select a payment method');
        }
        const cartData = await getCartData();
        setCartItems(cartData.cartItems);

    };




    const fetchCartData = async () => {
        try {
            const cartData = await getCartData();
            setCartItems(cartData.cartItems);
        } catch (error) {
            toast.error('Shopping cart is empty!');
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        // Gọi hàm showWholesalePrice mỗi khi giá trị của quantity thay đổi
        toggleWholesalePrice();
    }, [quantity]);

    const toggleWholesalePrice = (quantity, limitedProduct) => {
        // Kiểm tra nếu số lượng đủ để bán buôn
        if (quantity >= limitedProduct) {
            setShowWholesalePrice(true);
        } else {
            setShowWholesalePrice(false);
        }
    };

    const [showWholesalePrice, setShowWholesalePrice] = useState(false);


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
    const handleApplyCoupon = async () => {
        try {
            if (!couponCode) {
                console.log('Please enter a coupon code.');
                // Hoặc có thể hiển thị thông báo cho người dùng để nhập mã giảm giá trước khi áp dụng
                return;
            }

            const discountRes = await applyVoucher(couponCode);

            if (discountRes.error) {
                toast.error(discountRes.error);
            } else {
                setDiscount(discountRes.discount);
                // Thông báo cho người dùng rằng mã giảm giá đã được áp dụng thành công nếu cần
                toast.success('Coupon applied successfully!');
            }
        } catch (error) {
            // Xử lý lỗi khi gọi API áp dụng mã giảm giá
            console.error('Error applying coupon:', error);
            toast.error('Failed to apply coupon. Please try again.');
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
            if (item.quantity >= item.limitedProduct) {
                total += item.wholesalePrice * (100 - item.discount) / 100 * item.quantity;
            } else {
                total += item.discountPrice * item.quantity;
            }
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
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '5px'
                                                }} alt={item.name} />
                                                <h5><Link to={`/product-detail/${item.productId}`}>{item.name}</Link></h5>
                                            </td>
                                            <td className="shoping__cart__price">
                                                {item.quantity >= item.limitedProduct ? (
                                                    <>
                                                        <span className="product__details__price text-decoration-line-through font-italic">
                                                            {`$${item.originalPrice.toFixed(2)}`}
                                                        </span>
                                                        <span className="product__details__price text-danger">
                                                            {` $${item.wholesalePrice}`}
                                                        </span>
                                                    </>
                                                ) : (
                                                    `$${item.originalPrice.toFixed(2)}`
                                                )}
                                            </td>
                                            <td className="shoping__cart__price">
                                                {item.discount.toFixed(1)}%
                                            </td>
                                            <td className="shoping__cart__price">
                                                {item.quantity >= item.limitedProduct ? (
                                                    <>
                                                        <span className="product__details__price text-decoration-line-through font-italic">
                                                            {`$${item.discountPrice.toFixed(2)}`}
                                                        </span>
                                                        <span className="product__details__price text-danger">
                                                            {` $${(item.wholesalePrice * (100 - item.discount) / 100).toFixed(2)}`}
                                                        </span>
                                                    </>
                                                ) : (
                                                    `$${item.discountPrice.toFixed(2)}`
                                                )}
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
                                                {item.quantity >= item.limitedProduct ? (
                                                    <>
                                                        <span className="product__details__price text-decoration-line-through font-italic">
                                                            {`$${(item.discountPrice * item.quantity).toFixed(2)}`}
                                                        </span>
                                                        <span className="product__details__price text-danger">
                                                            {` $${((item.wholesalePrice * (100 - item.discount) / 100) * item.quantity).toFixed(2)}`}
                                                        </span>
                                                    </>
                                                ) : (
                                                    `$${(item.discountPrice * item.quantity).toFixed(2)}`
                                                )}
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
                                <form onSubmit={(e) => {
                                    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
                                }}>
                                    <input
                                        type="text"
                                        className='form-group'
                                        placeholder="Enter your coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button onClick={handleApplyCoupon} className="site-btn form-group">
                                        APPLY COUPON
                                    </button>
                                </form>
                            </div>


                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className="col-lg-6">
                            <div className="checkout__order">

                                <div className="checkout__order__total">
                                    Payment menthod
                                </div>
                                <div className="checkout__input__checkbox">
                                    <input
                                        type="radio"
                                        id="vnpay"
                                        name="paymentMethod"
                                        value="vnpay"
                                        checked={selectedPayment === 'vnpay'}
                                        onChange={() => handlePaymentSelection('vnpay')}
                                    />
                                    <label htmlFor="vnpay">
                                        <img
                                            src="/vnpay.png"
                                            className='mx-2'
                                            alt="VNPay"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        VNPay</label>
                                </div>

                                <div className="checkout__input__checkbox">
                                    <input
                                        type="radio"
                                        id="paypal"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={selectedPayment === 'paypal'}
                                        onChange={() => handlePaymentSelection('paypal')}
                                    />
                                    <label htmlFor="paypal">
                                        <img
                                            src="/paypal.png"
                                            className='mx-2'
                                            alt="VNPay"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        PayPal</label>
                                </div>

                                <div className="checkout__input__checkbox">
                                    <input
                                        type="radio"
                                        id="cod"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={selectedPayment === 'COD'}
                                        onChange={() => handlePaymentSelection('COD')}
                                    />
                                    <label htmlFor="cod">
                                        <img
                                            src="/cod.png"
                                            className='mx-2'
                                            alt="COD"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '5px'
                                            }}
                                        />
                                        Payment on delivery (COD)</label>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>{t('Cart Total')}</h5>
                                <ul>
                                    <li> {t('Subtotal')}<span>${calculateTotal()}</span></li>
                                    <li>{t('Discount')} <span>{(discount)}%</span></li>
                                    <li>{t('Total')} <span>${calculateTotal() * (100 - discount) / 100}</span></li>
                                </ul>
                                <button type="button" className="site-btn" onClick={handlePlaceOrder}>
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
export default ShoppingCart;
