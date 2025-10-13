import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
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
            setIsAuthorized(true);
        }
    }, [navigate]);

    // While checking auth, show nothing (or show loading if you want)
    if (isAuthorized === null) {
        return null; // or <div>Loading...</div>
    }

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome {username ? `${username}` : 'to Our Website'}!</h1>
                <p>Your one-stop destination for all things React!</p>
                <a href="/register" className="home-button">Get Started</a>
            </div>
        </div>
    );
}

export default Home;
