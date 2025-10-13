import React, { useState, useEffect } from 'react'; // ✅ You missed importing useEffect
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Login() {
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    let navigate = useNavigate();

    // ✅ Check token only once on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        }
    }, [navigate]); // ✅ include navigate as a dependency

    let handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/user/login", {
                email: formData.email,
                password: formData.password
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert("Login successful");
                navigate("/home");
            } else {
                alert("Login failed: No token received");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert("Login failed");
        }
    };

    return (
        <div className="container">
            <div>Login</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Don't have an account? <span><Link to="/register">Register</Link></span>
            </p>
        </div>
    );
}

export default Login;
