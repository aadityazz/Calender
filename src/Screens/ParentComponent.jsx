import React, {useContext} from 'react';
import Profile from './Profile';
import {UserContext} from "../UserContext";

const ParentComponent = () => {
    const {userInfo} = useContext(UserContext);

    const userData = {
        username: userInfo.username,
        email: userInfo.email,
        bookings: [
            { bookingDetails: 'Booking 1' },
            { bookingDetails: 'Booking 2' },
            // Add more booking objects as needed
        ],
    };

    return (
        <div>
            {userData ? <Profile user={userData} /> : <p>Loading...</p>}
        </div>
    );
};

export default ParentComponent;
