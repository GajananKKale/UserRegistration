import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming you'll create this file based on the CSS below

function NotFound() {
    return (
        <div className="container notfound-container">
            <div className="notfound-title">404 - Page Not Found</div>
            <p className="notfound-text">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/">
                <button className="home-button">Go Back Home</button>
            </Link>
        </div>
    );
}

export default NotFound;
