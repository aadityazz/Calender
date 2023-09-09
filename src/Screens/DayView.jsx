import React, { useEffect, useState } from 'react';
import Slot from './Slot';
import '../Styles/DayView.css';

const DayView = ({ date, admin }) => {
    const [slotsData, setSlotsData] = useState([]); // Initialize with an empty array
    console.log(date.toLocaleString().substring(0, 10));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/slot/getslots/${date.toLocaleString().substring(0, 10).replace(/\//g, '-')}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(response);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Response Data:', responseData);
                    // Assuming responseData contains an array called 'slots'
                    console.log(responseData.slot);
                    const times = responseData.slot.map(item => item.time);
                    setSlotsData(times); // Update state with the array of slots
                    console.log("slotsData" + slotsData);
                } else {
                    console.error('Error fetching slots:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        fetchData();
    }, [date]);

    return (
        <div className="day-view">
            <h3>Available Time Slots for {date.toLocaleDateString()}</h3>
            <div className="slots-container">
                {slotsData.map((time, index) => (
                    <Slot
                        key={`slot-${index}`}
                        time={time}
                        date={date}
                        admin={admin}
                    />
                ))}
            </div>
        </div>
    );
};

export default DayView;
