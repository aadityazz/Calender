// ParentComponent.js

import React, { useEffect, useState } from 'react';
import Profile from './Profile';

const ParentComponent = () => {
    const [user, setUser] = useState(null);

    // Fetch user data (e.g., from your authentication system or API)
    useEffect(() => {
        // Simulated user data for demonstration purposes
        const userData = {
            username: 'john_doe',
            email: 'john@example.com',
            bookings: [
                { bookingDetails: 'Booking 1' },
                { bookingDetails: 'Booking 2' },
                // Add more booking objects as needed
            ],
        };

        setUser(userData);
    }, []);

    return (
        <div>
            {user ? <Profile user={user} /> : <p>Loading...</p>}
        </div>
    );
};

export default ParentComponent;
