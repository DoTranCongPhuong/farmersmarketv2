import React, { useState } from 'react';

const ContactSection = () => {
    const contactData = [
        { icon: 'icon_phone', title: 'Phone', detail: '+01-3-8888-6868' },
        { icon: 'icon_pin_alt', title: 'Address', detail: '60-49 Road 11378 New York' },
        { icon: 'icon_clock_alt', title: 'Open time', detail: '10:00 am to 23:00 pm' },
        { icon: 'icon_mail_alt', title: 'Email', detail: 'hello@colorlib.com' },
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


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Xử lý dữ liệu khi người dùng nhấn nút gửi
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        // Reset form fields sau khi gửi
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <section className="contact spad">
            <div className="container">
                <div className="row">
                    {renderContactWidgets()}
                </div>
            </div>
             {/* Map Begin */}
             <div className="map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1117831499594!2d106.66208061425362!3d10.777868992312983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fb5a1d27f6f%3A0x29d3e2cc2eb30179!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1636939294615!5m2!1sen!2s"
                height="500"
                style={{ border: '0' }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Ho Chi Minh City Map"
            ></iframe>
            <div className="map-inside">
                <i className="icon_pin"></i>
                <div className="inside-widget">
                    <h4>Ho Chi Minh City</h4>
                    <ul>
                        <li>Phone: +84-123-456-789</li>
                        <li>Add: District 1, Ho Chi Minh City, Vietnam</li>
                    </ul>
                </div>
            </div>
        </div>
            {/* Map End */}

            {/* Contact Form Begin */}
            <div className="contact-form spad">
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
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    type="text"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-12 text-center">
                                <textarea
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <button type="submit" className="site-btn">SEND MESSAGE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Contact Form End */}
        </section>
    );
};

export default ContactSection;
