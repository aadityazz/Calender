import React from 'react';
import '../Styles/Slot.css'; // Import the CSS file for styling

const Slot = ({ startTime, endTime, color, onSelect }) => {
    const handleSelect = () => {
        // Implement the logic for handling slot selection here
        // You can call the onSelect function with relevant data
        onSelect({ startTime, endTime, color });
    };

    return (
        <div className="slot-container">
            <div className="slot-content">
                <span className="slot-time">Time: {startTime} - {endTime}</span>
                <button className="select-button" onClick={handleSelect}>Book</button>
            </div>
        </div>
    );
};

export default Slot;

