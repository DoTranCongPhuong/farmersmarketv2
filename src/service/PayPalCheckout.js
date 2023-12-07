import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = ({ amount = '1.00', currency = 'USD', onSuccess, onError, clientId }) => {
    const paypalOptions = {
        'client-id': clientId || 'ASTFm2Ko8QcIv9SzITv2XdMrXVQigU7Kg2u-bIW4HnEbbRPkHKZcV6dt6_IfUrhnhc5WomE_lG-y5GKT', // Thay YOUR_CLIENT_ID bằng client ID của bạn
        currency,
        components: 'buttons',
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amount,
                        currency_code: currency,
                    },
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
