import React from 'react';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-section">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-description">
                    We'd love to hear from you! Feel free to reach out to us for any questions, feedback, or support.
                </p>

                <div className="contact-details">
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <h3>Email</h3>
                        <p><a href="mailto:support@mealmate.com">support@mealmate.com</a></p>
                    </div>

                    <div className="contact-item">
                        <i className="fas fa-phone"></i>
                        <h3>Phone</h3>
                        <p><a href="tel:+1234567890">+1 234 567 890</a></p>
                    </div>

                    <div className="contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Location</h3>
                        <p>123 Healthy Lane, Wellness City, Fitland</p>
                    </div>
                </div>

                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" className="contact-submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
