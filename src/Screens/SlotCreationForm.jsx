import React, { useState } from 'react';
import '../Styles/SlotCreationForm.css';
import M from "materialize-css";
import {Navigate} from "react-router-dom";

const SlotCreationForm = ({ date}) => {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleCreateSlot = (event) => {
        event.preventDefault();

        // Calculate the end time as 1 hour after the selected start time
        const startTime = selectedTime;
        const [startHour, startMinute] = startTime.split(':').map(Number);

        let endHour;
        let endMinute;

        if (startHour === 23) {
            // If the start hour is 23, set the end hour to 00
            endHour = 0;
            endMinute = startMinute;
        } else {
            // Otherwise, add 1 to the start hour for the end hour
            endHour = startHour + 1;
            endMinute = startMinute;
        }

        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

        // Create the time slot string
        const time = `Time: ${startTime} - ${endTime}`;

        console.log("Slot button hit");
        console.log(time)
        fetch("http://localhost:5000/api/slot/saveslot", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date,
                time
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" });
                }
            }).catch(err => {
            console.log(err);
        });
    };


    return (
        <div className="slot-creation-form" onClick={handleCreateSlot}>
            <h2>Create Slots for</h2>

            <p>{date.toLocaleDateString()}</p>
            <div className="form-group">
                <label htmlFor="timePicker">Select Time:</label>
                <input
                    type="time"
                    id="timePicker"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </div>
            <button className="create-button" >Create Slot</button>
        </div>
    );
};

export default SlotCreationForm;
