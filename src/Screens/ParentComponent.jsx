import React, {useContext} from 'react';
import Profile from './Profile';
import {UserContext} from "../UserContext";
import {useEffect, useState} from "react";

const ParentComponent = () => {
    const {userInfo} = useContext(UserContext);
    const {user} = userInfo;
    const user_id = userInfo.id;

    // const [orderData, setOrderData] = useState([]);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/order/get/${user_id}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             console.log(response);
    //             if (response.ok) {
    //                 const responseData = await response.json();
    //                 console.log('Response Data:', responseData);
    //                 // Assuming responseData contains an array called 'slots'
    //                 console.log(responseData.slot);
    //                 const order = responseData.slot.map(item => item);
    //                 setOrderData(order); // Update state with the array of slots
    //                 console.log("orderData" + orderData);
    //             } else {
    //                 console.error('Error fetching slots:', response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching slots:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [user_id]);

    const userData = {
        username: user.username,
        email: user.email,
        bookings: [
            { bookingDetails: 'Booking 1' },
            { bookingDetails: 'Booking 2' },
            // Add more booking objects as needed
        ],
        //orderData,
    };

    return (
        <div>
            {userData ? <Profile user={userData} /> : <p>Loading...</p>}
        </div>
    );
};

export default ParentComponent;
