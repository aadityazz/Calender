import React, { useEffect, useState } from 'react';
import Slot from './Slot';

const DayView = ({ date, admin }) => {
    const [slotsData, setSlotsData] = useState([]);
    const [error, setError] = useState(null);
    console.log(date.toLocaleString().substring(0,10));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/slot/getslots/${date.toLocaleString().substring(0,10)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                console.log(response.json());
                if (response.ok) {
                    const data = await response.json();
                    setSlotsData(data);
                    console.log(data);
                }

                //console.log(slotsData);

            } catch (error) {
                console.error('Error fetching slots:', error);
                //console.log('Response:', response.text()); // Log the response for debugging
                setError(error.message);
            }
        };

        fetchData();
    }, [date]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="day-view">
            <h3>Available Time Slots for {date.toLocaleDateString()}</h3>
            <div className="slots-container">
                {slotsData.map((slot, index) => (
                    <Slot
                        key={`slot-${index}`}
                        time={slot.time}
                        admin={admin}

                    />
                ))}
            </div>
        </div>
    );
};

export default DayView;
