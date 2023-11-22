import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../service/API';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); // Lưu trữ vai trò được chọn
    const [successMessage, setSuccessMessage] = useState(''); // Define successMessage state
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleLogin = async () => {
        try {
            // Chuẩn bị dữ liệu người dùng để gửi đi
            const userData = {
                numberPhone: email,
                password: password,
                role: selectedRole,
            };

            // Gọi hàm loginUser để thực hiện yêu cầu đăng nhập
            const loggedInUser = await login(userData);
            console.log('Logged in user:', loggedInUser);
            // Xử lý sau khi đăng nhập thành công (ví dụ: lưu thông tin user vào local storage, điều hướng trang, vv.)
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            // Điều hướng đến trang chủ
            setTimeout(() => {
                navigate('/');
            }, 2000); // Điều hướng sau 2 giây
        } catch (error) {
            // Xử lý lỗi khi đăng nhập không thành công
            console.error('Login error:', error);
            // Hiển thị thông báo hoặc xử lý lỗi tùy ý ở đây
            setErrorMessage('Login failed. Please try again.');
            setSuccessMessage('');
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-75">
            <div className="d-flex justify-content-center border rounded-5 p-3 bg-white shadow box-area align-items-center">
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2>Hello, Again</h2>
                            <p>We are happy to have you back.</p>
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg bg-light fs-6"
                                placeholder="Phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="input-group p-3">
                            <h5 className="m-2">Role:</h5>
                            <div className="form-check m-2">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="admin"
                                    value="admin"
                                    checked={selectedRole === 'admin'}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="admin" className="form-check-label">
                                    Admin
                                </label>
                            </div>
                            <div className="form-check m-2">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="farmer"
                                    value="farmer"
                                    checked={selectedRole === 'farmer'}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="farmer" className="form-check-label">
                                    Farmer
                                </label>
                            </div>
                            <div className="form-check m-2">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="user"
                                    value="user"
                                    checked={selectedRole === 'user'}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor="user" className="form-check-label">
                                    User
                                </label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-lg btn-primary w-100 fs-6 site-btn" onClick={handleLogin}>Login</button>
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-lg btn-light w-100 fs-6">
                                <img src="google.png" style={{ width: '20px' }} className="me-2" alt="Google" />
                                <small>Sign In with Google</small>
                            </button>
                        </div>
                        <div className="row">
                            <small>Don't have an account? <Link className='nomal__a' to="/register">Sign Up</Link></small>
                        </div>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
