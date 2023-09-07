// Profile.js

import React from 'react';

const Profile = () => {
    return (
        <div className="profile">
            <h2>User Profile</h2>
            <div>
                {/*<strong>Username:</strong> {user.username}*/}
                <strong>Username:</strong> Aditya
            </div>
            <div>
                {/*<strong>Email:</strong> {user.email}*/}
                <strong>Email:</strong> adigpt0022@gmail.com
            </div>
            <div>
                <h3>Bookings</h3>
                {/*{user.bookings.length > 0 ? (*/}
                {/*    <ul>*/}
                {/*        {user.bookings.map((booking, index) => (*/}
                {/*            <li key={index}>{booking.bookingDetails}</li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*) : (*/}
                {/*    <p>No bookings yet.</p>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default Profile;
