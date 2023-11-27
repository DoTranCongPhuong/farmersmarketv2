import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../service/API';

const UserInfor = () => {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = '653e702c9511e1931a53f074';
                const token = localStorage.getItem('token');
                const userInfo = await getUserInfo(userID, token);
                setUser(userInfo.user);
                setAvatar(userInfo.user.img);
            } catch (error) {
                // Xử lý lỗi khi không thể lấy thông tin người dùng từ API
                console.error('Error fetching user information:', error);
            }
        };

        fetchData();
    }, []);

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
    const handleUpdateInfor = (method) => {
        // Code xử lý cập nhật thông tin người dùng
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <section className="checkout spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="checkout__form">
                            <h4>Hi {user?.firstName + '!'}</h4>
                            <div className="container mt-4 row">
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

                                <div
                                    type="button"
                                    className="btn btn-primary "
                                    onClick={() => handleUpdateInfor('method')}
                                >
                                    Save my information
                                </div>

                                <div
                                    type="button"
                                    className="btn btn-danger mt-2"
                                    onClick={() => handleSignOut('method')}
                                >
                                    Sign Out
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                        <div className="checkout__form">
                            <h4>User Information</h4>
                            <form action="#">
                                <div className="row">
                                    {user &&
                                        Object.keys(user).map((key) =>
                                            key === 'image' || key === '__v' || key === 'role' ? null : (
                                                <div className="col-lg-6" key={key}>
                                                    <div className="checkout__input">
                                                        <p>
                                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                            <span>*</span>
                                                        </p>
                                                        <input type="text" value={user[key]} />
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

export default UserInfor;