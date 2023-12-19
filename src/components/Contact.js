import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactSection = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const parsedUserInfo = JSON.parse(userInfoString);
            setUserInfo(parsedUserInfo);
            setEmail(parsedUserInfo.email || '');
        }
    }, []);

    const contactData = [
        { icon: 'icon_phone', title: 'Phone', detail: '+84 898.537.761' },
        { icon: 'icon_pin_alt', title: 'Address', detail: '01 Vo Van Ngan, Linh Chieu ward, Thu Duc city' },
        { icon: 'icon_clock_alt', title: 'Open time', detail: '10:00 am to 23:00 pm' },
        { icon: 'icon_mail_alt', title: 'Email', detail: 'fammer@example.com' },
    ];

    const renderContactWidgets = () => {
        return contactData.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-3 col-sm-6 text-center">
                <div className="contact__widget">
                    <span className={item.icon}></span>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                </div>
            </div>
        ));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Sending contact details via sendContact function
            // Replace sendContact with your actual sending function
            // await sendContact(email, message);
            // Display success toast upon successful submission
            toast.success('Message sent successfully!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });

            // Reset form fields after successful submission
            setEmail('');
            setMessage('');
        } catch (error) {
            // Display error toast if there's an issue sending the message
            toast.error('Failed to send message. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            console.error('Error sending contact:', error);
        }
    };

    const token = localStorage.getItem('token');


    return (
        <section className="contact spad">
            <ToastContainer />

            <div className="container">
                <div className="row">
                    {renderContactWidgets()}
                </div>
            </div>
            {/* Contact Form Begin */}
            <div className="contact-form spad "
                title={!token ? 'Cần đăng nhập để sử dụng tính năng này' : ''}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact__form__title">
                                <h2>Leave Message</h2>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userInfo.firstName + ' ' + userInfo.lastName}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email || 'Your Email'}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-12 text-center">
                                <textarea
                                    className="form-control"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={!token}
                                ></textarea>
                                <button type="submit" disabled={!token} className="site-btn">
                                    SEND MESSAGE
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Contact Form End */}
            {/* Map Begin */}
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5192.913499127456!2d106.76986322233289!3d10.851067825938964!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1701745959898!5m2!1svi!2s"
                    height="500"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Ho Chi Minh City Map"
                ></iframe>
                <div className="map-inside">
                    {/* <i className="icon_pin"></i> */}
                    <div className="inside-widget">
                        <h4>Ho Chi Minh City</h4>
                        <ul>
                            <li>Phone: +84-898-537-761</li>
                            <li>Add: 01 Vo Van Ngan, Linh Chieu, Thu Duc city</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Map End */}


        </section>
    );
};

export default ContactSection;
