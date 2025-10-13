import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [user, setUser] = useState({ name: "", mobile: "" });

    const alertShown = useRef(false); // 👈

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            if (!alertShown.current) {
                alert("You must be logged in");
                alertShown.current = true;
                navigate("/");
            }
            return;
        }

        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser({
                name: parsedUser.username,  // use parsedUser.name if that's what your backend returns
                mobile: parsedUser.mobile   // make sure this exists
            });
        }

        setIsAuthorized(true);
    }, [navigate]);

    if (isAuthorized === null) {
        return null;
    }

    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>Contact Us{{ user } ? `- Welcome ${user.name}` : ""}</h1>
                <p>
                    We'd love to hear from you! Whether you have a question, feedback, or a collaboration idea —
                    feel free to reach out.
                </p>
                <p>
                    Email: <a href="mailto:support@example.com">@example.com</a> <br />
                    Phone: +91 {user.mobile}
                </p>
                <a href="/register" className="contact-button">Join Now</a>
            </div>
        </div>
    );
}

export default Contact;
