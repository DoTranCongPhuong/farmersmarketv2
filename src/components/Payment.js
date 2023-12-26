import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

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
