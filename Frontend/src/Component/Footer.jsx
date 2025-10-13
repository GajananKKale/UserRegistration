import React from 'react';
import '../App.css'

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>All Rights Reserved to Me &copy; {year}</p>
        </footer>
    );
}

export default Footer;
