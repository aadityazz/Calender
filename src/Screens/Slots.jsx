import React from 'react';
import Slot from "./Slot";
import '../Styles/Slots.css'; // Import the CSS file for styling

const Slots = () => {
    const handleSlotSelect = (selectedSlot) => {
        // Implement your logic for handling the selected slot here
        console.log('Selected Slot:', selectedSlot);
    };


    return (
        <div className="slots-container">
            <h2 className="slots-title">Available Time Slots:</h2>
            <div className="slot-list">
                <Slot startTime="10:00 AM" endTime="11:00 AM" color="blue" onSelect={handleSlotSelect} />
                <Slot startTime="11:00 AM" endTime="12:00 PM" color="green" onSelect={handleSlotSelect} />
                <Slot startTime="2:00 PM" endTime="3:00 PM" color="red" onSelect={handleSlotSelect} />
                <Slot startTime="11:00 AM" endTime="12:00 PM" color="green" onSelect={handleSlotSelect} />
                <Slot startTime="11:00 AM" endTime="12:00 PM" color="green" onSelect={handleSlotSelect} />
                <Slot startTime="11:00 AM" endTime="12:00 PM" color="green" onSelect={handleSlotSelect} />

                {/* Add more Slot components here */}
            </div>
        </div>
    );
};

export default Slots;
