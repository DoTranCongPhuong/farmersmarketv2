import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfoById } from '../service/API';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const SellerInfor = () => {
    const { t } = useTranslation();

    const { farmerId } = useParams(); // Retrieve farmerId from URL params
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('/loading.gif');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfoById(farmerId); // Pass farmerId to your API call
                setUser(userInfo.user);
                setAvatar(userInfo.user.image || './user.png');
            } catch (error) {
                console.error('Error fetching user information:', error);
                toast.error('Failed to load data, please log in again');
            }
        };
        fetchData();
    }, [farmerId]);


    const renderUserInfo = () => {
        const formattedAddress = `${user.addressDetail}, ${user.street}, ${user.ward}, ${user.district}, ${user.city}, ${user.country}`;
        return (
            user && (
                <>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Name of Farmer')}</p>
                            <div>{`${user.lastName} ${user.firstName}`}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Email')}</p>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Number Phone')}</p>
                            <div>{user.numberPhone}</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>{t('Address')}</p>
                            <div>{formattedAddress}</div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="checkout__input">
                            <p>{t('Introducing farmers')}</p>
                            <div>{user.description}</div>
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
                            <h3>{t('Farmer Profile')}</h3>
                            <div className="container mt-4 row">
                                <div className="text-center mb-4">
                                    <img
                                        src={avatar}
                                        alt={t('Avatar Preview')}
                                        className="img-thumbnail"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                        <div className="checkout__form">
                            <h4>{t('User Information')}</h4>
                            <div className="row">{renderUserInfo()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerInfor;
