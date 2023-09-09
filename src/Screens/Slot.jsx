import React from 'react';
import '../Styles/Slot.css'; // Import the CSS file for styling

const Slot = ({ time, onSelect, admin }) => {
    const handleSelect = () => {
        // Implement the logic for handling slot selection here
        // You can call the onSelect function with relevant data
        onSelect({ time});
    };

    return (
        <div className="slot-container">
            <div className="slot-content">
                <span className="slot-time">{time}</span>
                {admin?(
                    <button className="select-button-delete" onClick={handleSelect}>Delete</button>
                ):(
                    <button className="select-button" onClick={handleSelect}>Book</button>
                )}

            </div>
        </div>
    );
};

export default Slot;

