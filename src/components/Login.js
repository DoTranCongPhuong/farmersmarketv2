import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getUserInfo } from '../service/API';

const Login = () => {
    const [numberPhone, setNumberPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    useEffect(() => {
        const existingToken = localStorage.getItem('token');
        if (existingToken) {
            navigate('/user-page');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const userData = {
                numberPhone: numberPhone,
                password: password,
                role: 'user',
            };

            const loggedInUser = await login(userData);
            const token = loggedInUser.token; // Giả sử token được trả về từ API là loggedInUser.token



            localStorage.setItem('token', token);
            setSuccessMessage('Login successful!');
            setErrorMessage('');

            const userInfoResponse = await getUserInfo();
            const userInfo = userInfoResponse.user;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please try again.';

            if (error.response?.data) {
                errorMessage = error.response.data.message; // Sử dụng optional chaining để truy cập thông tin lỗi từ phản hồi của API
            }

            setErrorMessage(errorMessage);
            setSuccessMessage('');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-75">
            <div className="d-flex justify-content-center border rounded-5 p-3 bg-white shadow box-area align-items-center">
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2>Hello</h2>
                            <p>We are happy to have you back.</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-2">
                            {successMessage && <div className="alert alert-success ">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="Phone number"
                                value={numberPhone}
                                onChange={(e) => setNumberPhone(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-1">
                            <input
                                type="password"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group my-3 px-3">
                            <button className="btn btn-lg btn-primary w-100 fs-6 site-btn" onClick={handleLogin}>Login</button>
                        </div>
                        <div className="row">
                            <small>Don't have an account? <Link className='nomal__a' to="/register">Sign Up</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
