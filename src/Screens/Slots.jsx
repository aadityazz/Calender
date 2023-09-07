import React from 'react';
import Slot from "./Slot";
const Slots = () => {
    const handleSlotSelect = (selectedSlot) => {
        // Implement your logic for handling the selected slot here
        console.log('Selected Slot:', selectedSlot);
    };
    return (
        <div className="calendar-view">
            <h3>Available Time Slots:</h3>
            <div className="slot-container">
                <Slot startTime="10:00 AM" endTime="11:00 AM" color="blue" onSelect={handleSlotSelect} />
                <Slot startTime="11:00 AM" endTime="12:00 PM" color="green" onSelect={handleSlotSelect} />
                <Slot startTime="2:00 PM" endTime="3:00 PM" color="red" onSelect={handleSlotSelect} />
                {/* Add more Slot components here */}
            </div>
        </div>
    );
};

export default Slots;
