import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = ({ amount, currency, onSuccess, onError }) => {
    const paypalOptions = {
        'client-id': 'ASTFm2Ko8QcIv9SzITv2XdMrXVQigU7Kg2u-bIW4HnEbbRPkHKZcV6dt6_IfUrhnhc5WomE_lG-y5GKT', // Thay YOUR_CLIENT_ID bằng client ID của bạn
        currency: currency || 'USD',
        components: 'buttons',
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount || '1.00', // Giá trị đơn hàng
                                    currency_code: currency || 'USD',
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    if (onSuccess) {
                        onSuccess(data, actions);
                    }
                }}
                onError={(err) => {
                    if (onError) {
                        onError(err);
                    }
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalCheckout;
