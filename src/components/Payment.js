import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../service/API';

const Payment = () => {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/');
    };
    const vnPaySuccess = async () => {
        try {
            const orderID = localStorage.getItem('orderID');
            const urlParams = new URLSearchParams(window.location.search);

            // Sử dụng toán tử logic "&&" để chỉ thêm các tham số khi chúng tồn tại trong URL
            const otherParams = {
                vnp_Amount: urlParams.get('vnp_Amount'),
                vnp_BankCode: urlParams.get('vnp_BankCode'),
                vnp_BankTranNo: urlParams.get('vnp_BankTranNo'),
                vnp_CardType: urlParams.get('vnp_CardType'),
                vnp_OrderInfo: urlParams.get('vnp_OrderInfo'),
                vnp_PayDate: urlParams.get('vnp_PayDate'),
                vnp_ResponseCode: urlParams.get('vnp_ResponseCode'),
                vnp_TmnCode: urlParams.get('vnp_TmnCode'),
                vnp_TransactionNo: urlParams.get('vnp_TransactionNo'),
                vnp_TransactionStatus: urlParams.get('vnp_TransactionStatus'),
                vnp_TxnRef: urlParams.get('vnp_TxnRef'),
                vnp_SecureHash: urlParams.get('vnp_SecureHash'),
            };

            // Gửi yêu cầu GET với các tham số đã tạo
            const response = await axiosInstance.get(`/vnpay_return/${orderID}`, {
                params: otherParams
            });

            return response.data;
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };


    const paypalSuccess = async () => {
        try {
            const orderID = localStorage.getItem('orderID');
            const urlParams = new URLSearchParams(window.location.search);
            const params = {
                paymentId: urlParams.get('paymentId'),
                token: urlParams.get('token'),
                PayerID: urlParams.get('PayerID'),
                orderID: orderID,
            };

            const response = await axiosInstance.get(`/paypal-success/${orderID}`, {
                params: params,
            });

            return response.data;
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };



    useEffect(() => {
        // Gọi các hàm để kiểm tra link và gọi API tương ứng
        vnPaySuccess();
        paypalSuccess();
    }, []);

    return (
        <div className='d-flex flex-column align-items-center'>
            <div style={{
                width: '480px',
                boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
                marginBottom: '10px',
            }}>
                <img
                    src='/payment.gif'
                    alt='Payment'
                    className='img-fluid rounded shadow'
                    style={{
                        width: '100%',
                        borderRadius: '50%',
                        opacity: 0.9,
                        objectFit: 'cover',
                    }}
                />
            </div>
            <button className='site-btn mt-3 mb-3' onClick={handleNavigateHome}>Continue shopping...</button>
        </div>
    );
};

export default Payment;
