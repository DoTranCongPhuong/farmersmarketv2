import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const sample = {
    firstName: 'Phuong',
    lastName: 'Do',
    country: 'Viet Nam',
    address: '130/12/4, Street 2',
    townCity: 'Truong Tho',
    countryState: 'Thu Duc',
    postcodeZIP: '051',
    phone: '0898537761',
    email: 'dotrancongphuong@gmail.com',
    img:
        'https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_1280.png', // Updated image URL
};

const UserInFor = () => {
    const [avatar, setAvatar] = useState(sample.img); // Set the initial avatar to the provided URL
    const [selectedPayment, setSelectedPayment] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    const handlePaymentSelection = (method) => {
        setSelectedPayment(method);
    };

    return (
        <section className="checkout spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="checkout__form">
                            <h4>Hi {sample.firstName + '!'}</h4>
                            <div className="container mt-4">
                                {avatar && (
                                    <div className="text-center mb-4">
                                        <img
                                            src={avatar}
                                            alt="Avatar Preview"
                                            className="img-thumbnail"
                                        />
                                    </div>
                                )}
                                <Form>
                                    <Form.Group controlId="formFile" className="mb-3 text-center">
                                        <h5 className="mb-3">Choose Avatar</h5>
                                        <Form.Control
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </Form.Group>
                                </Form>

                                <button
                                    type="button"
                                    className="site-btn "
                                    onClick={() => handlePaymentSelection('method')}
                                >
                                    Save my information
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                        <div className="checkout__form">
                            <h4>Billing Details</h4>
                            <form action="#">
                                <div className="row">
                                    {Object.keys(sample).map((key) =>
                                        key === 'img' ? (
                                            <div className="col-lg-6" key={key}>
                                            </div>
                                        ) : (
                                            <div className="col-lg-6" key={key}>
                                                <div className="checkout__input">
                                                    <p>
                                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                        <span>*</span>
                                                    </p>
                                                    <input type="text" placeholder={sample[key]} />
                                                </div>
                                            </div>
                                        )
                                    )}

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInFor;
