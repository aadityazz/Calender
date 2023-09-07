import React from 'react';
import Header from './Header';

const Layout = ({ children, onLogout }) => {
    return (
        <div className="layout">
            <Header onLogout={onLogout} />
            {children}
        </div>
    );
};

export default Layout;
