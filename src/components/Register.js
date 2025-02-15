import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../service/API'; // Import hàm gửi yêu cầu đăng ký từ api/index.js
import{ upLoadImgFirebase } from '../service/Firebase'


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        numberPhone: '',
        password: '',
        role: 'user',
        lastName: '',
        firstName: '',
        email: '',
        dateOfBirth: '',
        image: '',
    });
    const [successMessage, setSuccessMessage] = useState(''); // Define successMessage state
    const [errorMessage, setErrorMessage] = useState('');




    const handleInputChange = async (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
            const file = files[0];
            const url = await upLoadImgFirebase(file); // Assuming upLoadImgFirebase returns the uploaded image URL asynchronously
    
            // Once the image is uploaded, update the formData with the image URL
            setFormData((prevData) => ({
                ...prevData,
                image: url, // Set the image URL in the formData
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // Kiểm tra xem các trường tên, email, số điện thoại và mật khẩu có được điền đầy đủ không
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.numberPhone || !formData.password) {
            setErrorMessage('Please fill in all required fields.');
            setSuccessMessage('');
            return; // Dừng việc thực hiện khi có trường dữ liệu không hợp lệ
        }
    
        // Kiểm tra xem mật khẩu có ít nhất 6 kí tự không
        if (formData.password.length < 6) {
            setErrorMessage('Password should be at least 6 characters long.');
            setSuccessMessage('');
            return; // Dừng việc thực hiện khi mật khẩu không đủ độ dài
        }
    
        try {
            console.log("data: ", formData);
            await register(formData);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            // Chuyển người dùng đến trang chủ sau khi đăng ký thành công
            navigate('/');
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            setSuccessMessage('');
            console.error('Error registering:', error);
        }
    };
    
      

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-75">
            <div className="d-flex justify-content-center border rounded-5 p-3 bg-white shadow box-area align-items-center">
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2>Hello, New User</h2>
                            <p>We are excited to have you here.</p>
                        </div>
                        {/* Form inputs */}
                        <form onSubmit={handleSignUp} method='post'>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Phone number"
                                    name="numberPhone"
                                    value={formData.numberPhone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* First Name */}
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Email */}
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Date of Birth */}
                            <p htmlFor="dateOfBirth" className="form-label">
                                Date of Birth:
                            </p>
                            <div className="input-group mb-3">

                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    className="form-control form-control-lg bg-light fs-6"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    min="1900-01-01" // Đặt ngày tối thiểu cho ngày sinh (có thể điều chỉnh)
                                    max={new Date().toISOString().split('T')[0]} // Đặt ngày tối đa là ngày hiện tại
                                    required // Bắt buộc nhập
                                />
                            </div>

                            {/* Image upload */}
                            <div className="input-group mb-3">
                                <input
                                    type="file"
                                    className="form-control form-control-lg bg-light fs-6"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-primary w-100 fs-6 site-btn" type="submit">
                                    Sign Up
                                </button>
                            </div>
                            <div className="row">
                                <small>
                                    Already have an account? <Link className='nomal__a' to="/login">Sign In</Link>
                                </small>
                            </div>
                        </form>
                        <div className="d-flex justify-content-center align-items-center mt-2">
                            {successMessage && <div className="alert alert-success ">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Register;
