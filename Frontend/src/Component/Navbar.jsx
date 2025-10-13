import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ Add useNavigate
import '../App.css';

function Navbar() {
    const navigate = useNavigate(); // ✅ useNavigate must be inside the component

    let logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <nav className="navbar">
            <div className='logo'>
                MY Website
            </div>
            <div className="nav-left">
                <NavLink to="/home" end>Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/user">All Users</NavLink>

                {/* ✅ Add a class for styling */}
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
