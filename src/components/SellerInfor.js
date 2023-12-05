import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../service/API';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerInfor = () => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('/loading.gif');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userInfo = await getUserInfo(token);
                setUser(userInfo.user);
                setAvatar(userInfo.user.image || './user.png');
            } catch (error) {
                console.error('Error fetching user information:', error);
                toast.error('Failed to load data, please log in again');
            }
        };

        fetchData();
    }, []);

    const formatKey = (key) => {
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    };

    const renderUserInfo = () => {
        const formattedAddress = `${user.addressDetail}, ${user.street}, ${user.ward}, ${user.district}, ${user.city}, ${user.country}`;
        return (
            user && (
                <>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>Name of Fammer</p>
                            <div>{`${user.lastName} ${user.firstName}`}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>Email</p>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>Number Phone</p>
                            <div>{user.numberPhone}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>Address</p>
                            <div>{formattedAddress}</div>
                        </div>
                    </div>
                </>
            )
        );
    };
    return (
        <section className="checkout spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="checkout__form">
                            <h3>Farmer Profile</h3>
                            <div className="container mt-4 row">
                                <div className="text-center mb-4">
                                    <img
                                        src={avatar}
                                        alt="Avatar Preview"
                                        className="img-thumbnail"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                        <div className="checkout__form">
                            <h4>User Information</h4>
                            <div className="row">{renderUserInfo()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerInfor;
