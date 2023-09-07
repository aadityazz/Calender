
import React from 'react';

const ConfirmationBooking = ({ selectedSlot }) => {
    return (
        <div>
            <h2>Confirm Booking</h2>
            <p>Selected Time Slot: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
            {/* Add booking confirmation form or actions here */}
        </div>
    );
};

export default ConfirmationBooking;
