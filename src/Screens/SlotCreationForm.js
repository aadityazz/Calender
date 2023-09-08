import React, { useState } from 'react';
import '../Styles/SlotCreationForm.css';

const SlotCreationForm = ({ date}) => {
    const [selectedTime, setSelectedTime] = useState('');
    const [error, setError] = useState('');

    console.log(date);

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleCreateSlot = () => {
        if (!date || !selectedTime) {
            setError('Please select both date and time.');
            return;
        }

        // Create a slot with selectedDate and selectedTime
        const newSlot = {
            date: date,
            time: selectedTime,
        };

        // Pass the new slot to the parent component
        //onSlotCreate(newSlot);

        // Reset form fields
        setSelectedTime('');
        setError('');
    };

    return (
        <div className="slot-creation-form">
            <h2>Create Slots for</h2>

            <p>{date.toLocaleDateString()}</p>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label htmlFor="timePicker">Select Time:</label>
                <input
                    type="time"
                    id="timePicker"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </div>
            <button className="create-button" onClick={handleCreateSlot}>Create Slot</button>
        </div>
    );
};

export default SlotCreationForm;
