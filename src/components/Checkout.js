import React, { useState, useEffect } from 'react';
import PayPalCheckout from '../service/PayPalCheckout';

// This value is from the props in the UI

const sample = {
    firstName: 'Please enter your first name',
    lastName: 'Please enter your last name',
    country: 'Please enter your country',
    address: 'Please enter your address',
    townCity: 'Please enter your town/city',
    countryState: 'Please enter your country/state',
    postcodeZIP: 'Please enter your postcode/ZIP',
    phone: 'Please enter your phone number',
    email: 'Please enter your email',
    orderNotes: 'Notes about your order, e.g. special notes for delivery.'
};
const bill = {
    subtotal: '$750.99',
    total: '$750.99',
    //... Other data
};

const Checkout = () => {

    const [selectedPayment, setSelectedPayment] = useState('');

    const paypalOptions = {
        'clientId': 'AYTOAJ31AZcksdFZBKXP4B0F_dMtF9VZDyEj8i8E0L22UDQSHaCXqU0JXjTUNR8I71mkpa8m6q1Gd0nK',
        currency: 'USD',
        components: 'buttons',
    };

    const handleSuccess = (data, actions) => {
        // Xử lý khi thanh toán thành công
        console.log('Payment successful:', data);
        // Redirect hoặc thực hiện các hành động sau khi thanh toán thành công
    };

    // Hàm xử lý khi có lỗi trong quá trình thanh toán
    const handleError = (err) => {
        // Xử lý khi có lỗi trong quá trình thanh toán
        console.error('Payment error:', err);
        // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác khi có lỗi
    };

    const handlePaymentSelection = (method) => {
        setSelectedPayment(method);
        // Xử lý việc chọn hình thức thanh toán
    };

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="checkout__form">
                            <h4>Billing Details</h4>
                            <form action="#">
                                <div className="row">
                                    {Object.keys(sample).map((key) => (
                                        <div className="col-lg-12" key={key}>
                                            <div className="checkout__input">
                                                <p>
                                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}<span>*</span>
                                                </p>
                                                <input type="text" placeholder={sample[key]} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="checkout__order">
                            <h4>Your Order</h4>

                            <div className="checkout__order__total">Total <span>{bill.total}</span></div>
                            <div className="checkout__input__checkbox">

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
                                <label htmlFor="vnpay">VNPay</label>
                            </div>
                            <div className="checkout__input__checkbox">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={selectedPayment === 'cod'}
                                    onChange={() => handlePaymentSelection('cod')}
                                />
                                <label htmlFor="cod">Payment on delivery (COD)</label>
                            </div>
                            <div>
                                <PayPalCheckout
                                    amount="100.00" // Thay đổi giá trị theo đơn hàng thực tế
                                    currency="USD"
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                />
                            </div>
                            <label htmlFor="cod">Payment on delivery (COD)</label>
                            <button type="submit" className="site-btn">PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Checkout;
