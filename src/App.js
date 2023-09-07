// App.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import your Layout component
import Home from './Screens/Home';
import {UserContextProvider} from "./UserContext";
import Login from "./Screens/Login";
import Register from "./Screens/Register"; // Import other pages

function App() {
    const [user, setUser] = useState(null);

    // Define the logout function
    const handleLogout = () => {
        // Implement your logout logic here
    };

    return (
        <UserContextProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout onLogout={handleLogout}>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/other"
                    element={
                        <Layout onLogout={handleLogout}>
                            {/*<OtherPage />*/}
                        </Layout>
                    }
                />
                <Route
                    path = "/login"
                    element={
                        <Layout onLogout={handleLogout}>
                            <Login/>
                        </Layout>
                    }
                />
                <Route
                    path = "/register"
                    element={
                        <Layout onLogout={handleLogout}>
                            <Register/>
                        </Layout>
                    }
                />

            </Routes>
        </UserContextProvider>
    );
}

export default App;
