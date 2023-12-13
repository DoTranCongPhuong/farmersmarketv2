import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUser, changeUserPassword } from '../service/API';
import { upLoadImgFirebase } from '../service/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserInfor = () => {

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('/loading.gif');
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userInfo = await getUserInfo(token);
                setUser(userInfo.user);
                setAvatar(userInfo.user.image || './user.png');

                
            } catch (error) {
                // Xử lý lỗi khi không thể lấy thông tin người dùng từ API
                console.error('Error fetching user information:', error);
                toast.error('Failed to load data, login again');
            }
        };

        fetchData();
    }, []);

    const handleImageChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            setAvatar('/loading.gif'); // Hiển thị ảnh loading khi bắt đầu tải ảnh

            const imageUrl = await upLoadImgFirebase(file);

            setUser(prevUser => ({
                ...prevUser,
                image: imageUrl, // Lưu đường dẫn URL vào trường Image của đối tượng người dùng
            }));


            setAvatar(imageUrl); // Cập nhật ảnh đại diện với URL mới
        } catch (error) {
            console.error('Error handling image change:', error);
            setAvatar(user.image); // Sử dụng URL cũ trong trường hợp xảy ra lỗi
        }
    };

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') setOldPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp không
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password don't match");
            return;
        }

        // Kiểm tra mật khẩu có đủ mạnh không
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\[\]{}|;:'",.<>/?]).{5,}$/;
        if (!strongPasswordRegex.test(newPassword)) {
            setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 5 characters long");
            return;
        }

        try {
            await changeUserPassword(oldPassword, newPassword);
            setSuccessMessage('Password changed successfully');
            setErrorMessage('');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            // Xử lý lỗi nếu request thất bại
            setErrorMessage(error.message || 'Failed to change password');
            setSuccessMessage('');
        }
    };

    // Hàm xử lý khi người dùng thay đổi thông tin
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value, // Cập nhật giá trị của trường thông tin người dùng
        });
    };

    // Hàm xử lý khi người dùng nhấn nút để cập nhật thông tin
    const handleUpdateUserInfo = async () => {
        try {
            await updateUser(user);
            toast.success('User information updated successfully');
            console.log('User information updated successfully');

            const userInfoResponse = await getUserInfo();
            const userInfo = userInfoResponse.user;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));


        } catch (error) {
            console.error('Error updating user information:', error);
            toast.error('Failed to update user information');
        }
    };


    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <section className="checkout spad">
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="checkout__form">
                            <h4>Hi {user?.firstName + '!'}</h4>
                            <div className="container mt-4 row">
                                <div className="text-center mb-4">
                                    <img
                                        src={avatar}
                                        alt="Avatar Preview"
                                        className="img-thumbnail"
                                    />
                                </div>

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
                                    className="btn btn-primary "
                                    onClick={handleUpdateUserInfo}
                                >
                                    Save my information
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger mt-2"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </button>
                                <div className='mt-4'>
                                    <h4 className='mb-1'>Change Password</h4>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {successMessage && <div className="alert alert-success ">{successMessage}</div>}
                                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    </div>
                                    <form onSubmit={handleSubmit} className='row'>
                                        <div className="form-group">
                                            <label htmlFor="oldPassword">Current Password</label>
                                            <input
                                                type="password"
                                                name="oldPassword"
                                                value={oldPassword}
                                                onChange={handleChangePassword}
                                                className="form-control"
                                                placeholder="Enter your current password"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="newPassword">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={newPassword}
                                                onChange={handleChangePassword}
                                                className="form-control"
                                                placeholder="Enter your new password"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={handleChangePassword}
                                                className="form-control"
                                                placeholder="Confirm your new password"
                                            />
                                        </div>
                                        <button className='btn btn-warning' type="submit">Change Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                        <div className="checkout__form">
                            <h4>User Information</h4>
                            <form>
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
                                                        <input
                                                            type="text"
                                                            value={user[key]}
                                                            name={key} // Đặt tên của input là key để xác định trường cần cập nhật
                                                            onChange={handleInputChange} // Xử lý sự kiện khi người dùng thay đổi giá trị
                                                        />
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