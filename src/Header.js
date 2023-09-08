import React, { useContext } from 'react';
import { UserContext } from "./UserContext";
import { useNavigate } from 'react-router-dom';
import './Styles/Header.css'; // Import your header CSS file

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const onLogout = (event) => {
        // Implement your logout logic here, such as clearing localStorage and resetting userInfo
        // localStorage.removeItem('jwt');
        // localStorage.removeItem('user');
        event.preventDefault();
        setUserInfo(null);
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <header className="navbar">
            <nav className="nav-container">
                <h1 className="nav-logo">Calendar</h1>
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
                            <button className="login-button" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
