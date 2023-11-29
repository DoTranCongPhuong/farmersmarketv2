import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { clearCart, clearPayment, clearShippingAddress } from "../../action";
import { useNavigate } from "react-router-dom";
import payOrder from "../../services/payOrder";

const style = { layout: "vertical" };
// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, orderInfor, callback }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [error, setError] = useState(null)
  const handleApprove = (res) => {
    const data = {
      ...orderInfor,
      paymentResult: {
        ...res
      },
    }
    payOrder(data, callback)
  }
  if (error) {
    alert(error)
  }
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        onClick={(data, actions) => {
          const hasBought = false
          if (hasBought) {
            setError("You has bought it")
            return actions.reject()
          }
          else {
            return actions.resolve()
          }
        }}
        style={style}
        disabled={false}
        forceReRender={[orderInfor.totalPrice, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: orderInfor.totalPrice,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={async (data, action) => {
          const order = await action.order.capture();
          const res = {
            id: order.id,
            status: order.status,
            update_time: order.update_time,
            payer: order.payer,
          }
          handleApprove(res);
        }}
        onCancel={() => { console.log("Transactions are canceled") }}
        onError={() => {
          setError("PayPal Checkout onError");
        }}
      />
    </>
  );
};
function PaypalButton({ orderInfor}) {
  const currency = "USD";
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const clearInfor = () => {
    dispatch(clearShippingAddress())
    dispatch(clearPayment())
    dispatch(clearCart())
    navigate('/thanks')
    localStorage.removeItem('stepCheckout')
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "test",
        components: "buttons",
        currency: "USD",
      }}
    >
      <ButtonWrapper currency={currency} showSpinner={false} orderInfor={orderInfor} callback={clearInfor} />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;