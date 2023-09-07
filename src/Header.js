import React from 'react';
import './Styles/Header.css'; // Import the CSS file for styling

const Header = ({ onLogout }) => {
    return (
        <header className="navbar">
            <nav className="nav-container">
                <h1 className="nav-logo">Calendar</h1>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/">Home</a>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <a href="/profile">Profile</a>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <button className="logout-button" onClick={onLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
