import React from 'react';
import profile from '../Utils/profile.svg'; // Import the image correctly
import '../Styles/Profile.css'; // Import CSS for styling

const Profile = ({ user }) => {
    const booking = user.bookings;
    return (
        <div className="profile-container">
            <div className="profile-image">
                <img src={profile} alt="Profile" />
            </div>
            <div className="profile-details">
                <h2>User Profile</h2>
                <div>
                    <strong>Username:</strong> {user.username}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
                <div>
                    {!user.isAdmin ? (
                        <>
                            <h3>Bookings</h3>
                            {user.bookings.length > 0 ? (
                                <ul>
                                    {user.bookings.map((booking, index) => (
                                        <li key={index}>{booking.bookingDetails}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No bookings yet.</p>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>

            </div>
        </div>
    );
};


export default Profile;
