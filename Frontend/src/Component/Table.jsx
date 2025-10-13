import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Table() {
    const [userData, setUserData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [updateUser, setUpdateUser] = useState({ username: "", email: "", mobile: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const navigate = useNavigate();
    const hasRun = useRef(false);

    const parseJwt = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const token = localStorage.getItem("token");
        console.log("[Mount] token from localStorage:", token);
        if (!token) {
            alert("You must be logged in");
            setIsAuthorized(false);
            navigate("/");
            return;
        }
        const decoded = parseJwt(token);
        console.log("[Mount] parsed payload:", decoded);
        if (!decoded || (!decoded.id && !decoded._id)) {
            alert("Invalid token, please login again");
            // remove token cautiously
            localStorage.removeItem("token");
            setIsAuthorized(false);
            navigate("/");
            return;
        }
        const userId = decoded.id || decoded._id;
        setLoggedInUserId(userId);
        setIsAuthorized(true);
    }, [navigate]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("[fetchData] token:", token);
            const res = await axios.get("http://localhost:8000/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("[fetchData] got:", res.data.user);
            setUserData(res.data.user);
        } catch (error) {
            console.error("[fetchData] error:", error.response?.data || error.message);
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                alert("Session expired or unauthorized. Please login.");
                // Only now remove token
                localStorage.removeItem("token");
                setIsAuthorized(false);
                navigate("/");
            }
        }
    };

    useEffect(() => {
        if (isAuthorized) {
            fetchData();
        }
    }, [isAuthorized]);

    const handleDelete = async (id, username) => {
        console.log("[handleDelete] id:", id, "loggedInUserId:", loggedInUserId);
        if (id !== loggedInUserId) {
            alert("You can only delete your own account");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            console.log("[handleDelete] token:", token);
            const res = await axios.delete(`http://localhost:8000/api/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("[handleDelete] success:", res.data);
            alert(`${username} deleted`);
            fetchData();
        } catch (error) {
            console.error("[handleDelete] error:", error.response?.data || error.message);
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                alert("Unauthorized. Please login again.");
                localStorage.removeItem("token");
                setIsAuthorized(false);
                navigate("/");
            }
        }
    };

    const handleEditClick = (user) => {
        console.log("[handleEditClick] user._id:", user._id, "loggedInUserId:", loggedInUserId);
        if (user._id !== loggedInUserId) {
            alert("You can only edit your own profile");
            return;
        }
        setSelectedUserId(user._id);
        setUpdateUser({ username: user.username, email: user.email, mobile: user.mobile });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("[handleSubmit] selectedUserId:", selectedUserId, "loggedInUserId:", loggedInUserId);
        if (!selectedUserId || selectedUserId !== loggedInUserId) {
            alert("Unauthorized update attempt");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            console.log("[handleSubmit] token:", token);
            const res = await axios.put(
                `http://localhost:8000/api/user/${selectedUserId}`,
                updateUser,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("[handleSubmit] success:", res.data);
            alert("User updated");
            setIsModalOpen(false);
            setUpdateUser({ username: "", email: "", mobile: "" });
            setSelectedUserId(null);
            fetchData();
        } catch (error) {
            console.error("[handleSubmit] error:", error.response?.data || error.message);
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                alert("Unauthorized. Please login again.");
                localStorage.removeItem("token");
                setIsAuthorized(false);
                navigate("/");
            }
        }
    };

    if (isAuthorized === null) return <p>Loading...</p>;
    if (isAuthorized === false) return <p>Redirecting...</p>;

    return (
        <>
            <div className="table-container">
                <h1>User List</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{idx + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>
                                    {user._id === loggedInUserId ? (
                                        <>
                                            <button className="btn edit-btn" onClick={() => handleEditClick(user)}>
                                                Edit
                                            </button>
                                            <button className="btn delete-btn" onClick={() => handleDelete(user._id, user.username)}>
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <span style={{ color: "gray", fontStyle: "italic" }}>No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Update User</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="username"
                                value={updateUser.username}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={updateUser.email}
                                onChange={handleInputChange}
                                required
                            />
                            <label>Mobile No:</label>
                            <input
                                type="number"
                                name="mobile"
                                value={updateUser.mobile}
                                onChange={handleInputChange}
                                required
                            />

                            <div className="modal-buttons">
                                <button type="submit" className="btn save-btn">Save</button>
                                <button type="button" className="btn cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Table;
