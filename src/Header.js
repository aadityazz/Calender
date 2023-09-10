import React, { useContext } from 'react';
import { UserContext } from "./UserContext";
import { Link, Navigate } from "react-router-dom";
import './Header.css'; // Import your CSS file for styling

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const admin = userInfo && userInfo.user ? userInfo.user.isAdmin : null;

    const onLogout = () => {
        setUserInfo(null);
        localStorage.removeItem("user");
    };

    return (
        <header className="navbar">
            <nav className="nav-container">
                <div className="left-section">
                    <h1 className="nav-logo">Calendar</h1>
                    {userInfo && admin ? <span className="admin-label">Admin</span> : null}
                </div>
                <ul className="nav-menu">
                    {userInfo ? (
                        // If userInfo exists, render Logout button
                        <li className="nav-item">
                            <button className="logout-button" onClick={onLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        // If userInfo doesn't exist, render Login button
                        <li className="nav-item">
                            <Link to="/login">
                                <button className="login-button">
                                    Login
                                </button>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
