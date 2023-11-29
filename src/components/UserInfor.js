import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUser } from '../service/API';
import { upLoadImgFirebase } from '../service/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserInfor = () => {

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('/loading.gif');
    const navigate = useNavigate();

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

        } catch (error) {
            console.error('Error updating user information:', error);
            toast.error('Failed to update user information');
        }
    };


    const handleSignOut = () => {
        localStorage.removeItem('token');
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