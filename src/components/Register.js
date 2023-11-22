import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../service/API'; // Import hàm gửi yêu cầu đăng ký từ api/index.js
import app from '../service/Firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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





    const storage = getStorage(app);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            handleImageUpload(file);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageUpload = async (file) => {
        // Tạo reference đến thư mục trên Firebase Storage
        const storageRef = ref(storage, `images/${file.name}`);

        // Tải lên file lên Firebase Storage
        await uploadBytes(storageRef, file);

        // Lấy URL của hình ảnh sau khi tải lên
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image URL:', downloadURL);

        setFormData((prevData) => ({
            ...prevData,
            image: downloadURL,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            console.log("data: ", formData);
            await register(formData);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            // Điều hướng đến trang chủ
            setTimeout(() => {
                navigate('/');
            }, 5000); // Điều hướng sau 5 giây
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            setSuccessMessage('');
            console.log('rer: ', error)
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Role selection */}
                            <div className="input-group mb-3">
                                {/* <h5>Role:</h5>
                                <div className="form-check ml-3">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="user"
                                        name="role"
                                        checked={formData.role === 'user'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="user" className="form-check-label">
                                        User
                                    </label>
                                </div>
                          */}
                            </div>


                            {/* Last Name */}
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleImageUpload}
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
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Register;
