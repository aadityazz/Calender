import React from 'react';
import Slot from './Slot';

const DayView = ({ date, admin }) => {
    // Generate slots for the selected date
    const generateSlots = () => {
        // Example slots for demonstration, you should replace this with your data or logic
        const slotsData = [
            { startTime: '10:00 AM', endTime: '11:00 AM', color: 'blue' },
            { startTime: '11:00 AM', endTime: '12:00 PM', color: 'green' },
            { startTime: '2:00 PM', endTime: '3:00 PM', color: 'red' },
        ];

        return slotsData.map((slot, index) => (
            <Slot
                key={`slot-${index}`}
                startTime={slot.startTime}
                endTime={slot.endTime}
                color={slot.color}
                admin ={admin}
                onSelect={handleSlotSelect} // You can define the handleSlotSelect function
            />
        ));
    };

    // Handle slot selection, you can implement your logic here
    const handleSlotSelect = (selectedSlot) => {
        // Implement your logic for handling the selected slot here
        console.log('Selected Slot:', selectedSlot);
    };

    return (
        <div className="day-view">
            <h3>Available Time Slots for {date.toLocaleDateString()}</h3>
            <div className="slots-container">
                {generateSlots()}
            </div>
        </div>
    );
};

export default DayView;
