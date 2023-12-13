import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = ({ amount = '1.00', currency = 'USD', onSuccess, onError, clientId, cartItems, totalDiscount = 10 }) => {
    const paypalOptions = {
        'client-id': clientId || 'ASTFm2Ko8QcIv9SzITv2XdMrXVQigU7Kg2u-bIW4HnEbbRPkHKZcV6dt6_IfUrhnhc5WomE_lG-y5GKT', // Thay YOUR_CLIENT_ID bằng client ID của bạn
        currency,
        components: 'buttons',
    };

    const createOrder = (data, actions) => {
        // Tính tổng tiền của giỏ hàng
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

        // Tính tổng tiền cuối cùng sau khi áp dụng giảm giá
        const totalAmount = subtotal - totalDiscount;

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalAmount.toFixed(2), // Làm tròn tổng tiền cuối cùng đến 2 chữ số sau dấu thập phân
                        currency_code: currency,
                        breakdown: {
                            item_total: {
                                currency_code: currency,
                                value: subtotal.toFixed(2), // Giá trị của các sản phẩm trước khi áp dụng giảm giá
                            },
                            discount: {
                                currency_code: currency,
                                value: totalDiscount.toFixed(2), // Giá trị giảm giá
                            },
                        },
                    },
                    items: cartItems.map(item => {
                        return {
                            name: item.name,
                            quantity: item.quantity || 1,
                            unit_amount: {
                                currency_code: currency,
                                value: item.price,
                            },
                        };
                    }),
                },
            ],
        });
    };

    const handleApprove = (data, actions) => {
        if (onSuccess) {
            onSuccess(data, actions);
        }
    };

    const handleError = (err) => {
        if (onError) {
            onError(err);
        }
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => handleApprove(data, actions)}
                onError={(err) => handleError(err)}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalCheckout;
