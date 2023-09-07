import React from 'react';

const Slot = ({ startTime, endTime, color, onSelect }) => {
    const handleSelect = () => {
        // Implement the logic for handling slot selection here
        // You can call the onSelect function with relevant data
        onSelect({ startTime, endTime, color });
    };

    return (
        <div className="slot" style={{ backgroundColor: color }}>
            <span>Time: {startTime} - {endTime}</span>
            <button onClick={handleSelect}>Select</button>
        </div>
    );
};

export default Slot;
