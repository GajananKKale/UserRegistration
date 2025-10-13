import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();
    const hasRun = useRef(false);
    const [isAuthorized, setIsAuthorized] = useState(null); // null = loading
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (!token) {
            alert("You must be logged in");
            navigate("/");
        } else {
            if (userData) {
                const user = JSON.parse(userData);
                setUsername(user.username);
            }
            setIsAuthorized(true); // ✅ only show component when token exists
        }
    }, [navigate]);

    // Optional: Show nothing or loading until check is done
    if (isAuthorized === null) {
        return null; // or <div>Loading...</div>
    }

    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Us</h1>
                <h1 style={{ color: "blue" }}>{`welcome my friend ${username}`}</h1> <span style={{ color: "white", backgroundColor: "light-black" }}>I Can See you!!!</span>
                <p>
                    We are a team of passionate developers building user-friendly web applications with React.
                    Our goal is to create clean, responsive, and efficient applications that users love to use.
                </p>
                <p>
                    Whether you're a beginner or a pro, this platform provides something useful for everyone.
                    Keep exploring and stay updated with the latest in frontend development!
                </p>
                <a href="/contact" className="about-button">Contact Us</a>
            </div>
        </div>
    );
}

export default About;
