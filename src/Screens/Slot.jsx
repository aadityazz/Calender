import React from 'react';
import '../Styles/Slot.css';
import M from "materialize-css"; // Import the CSS file for styling

const Slot = ({ time, date, id, admin }) => {

    const handleDelete = async () => {
        try {
            // Make an HTTP DELETE request to delete the slot on the server
            const response = await fetch('http://localhost:5000/api/slot/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ time, date: date.toLocaleString().substring(0, 10) }), // Send both time and date as JSON data
            });

            if (response.ok) {
                console.log('Delete success');
            } else {
                console.error('Failed to delete slot:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting slot:', error);
        }
    };

    const handleBooking = async () => {
        try {
            // Make an HTTP DELETE request to delete the slot on the server
            const response = await fetch('http://localhost:5000/api/slot/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ time, date: date.toLocaleString().substring(0, 10) }), // Send both time and date as JSON data
            });

            if (response.ok) {
                console.log('Delete success');

                // await fetch("http://localhost:5000/api/order/add", {
                //     method: "post",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         user_id: id,
                //         date: date.toLocaleString().substring(0,10),
                //         time: time,
                //     })
                // }).then(res => res.json())
                //     .then(data => {
                //         if (data.error) {
                //             M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                //         } else {
                //             M.toast({ html: data.message, classes: "#43a047 green darken-1" });
                //         }
                //     }).catch(err => {
                //         console.log(err);
                //     });

                // Send an email request to the server
                const emailResponse = await fetch('http://localhost:5000/api/slot/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recipientEmail: 'jojonodejs@gmail.com', // Replace with the recipient's email address user.email
                        subject: 'Booking Confirmation',
                        text: `Your booking has been confirmed with consultant at ${time}`,
                    }),
                });
                console.log(emailResponse);
                if (emailResponse.ok) {
                    console.log('Email sent successfully');

                    const dateForm = date.toLocaleString().substring(0,10);
                    const timing = time.toString();
                    const timeForm = timing.substring(6, timing.length);

                    if (typeof dateForm !== 'string') {
                        throw new Error('Invalid date format');
                    }

                    // Split the date into its components
                    const dateComponents = dateForm.split('/');
                    if (dateComponents.length !== 3) {
                        throw new Error('Invalid date format');
                    }

                    const day = parseInt(dateComponents[0], 10);
                    const month = parseInt(dateComponents[1], 10);
                    const year = parseInt(dateComponents[2], 10);

                    // Extract the start and end times
                    const timeParts = timeForm.split(' - ');
                    if (timeParts.length !== 2) {
                        throw new Error('Invalid time format');
                    }

                    const [startTime, endTime] = timeParts;

                    // Parse the start and end times in hh:mm format
                    const [startHour, startMinute] = startTime.split(':').map(Number);
                    const [endHour, endMinute] = endTime.split(':').map(Number);

                    // Create the start and end date objects
                    const startDate = new Date(year, month - 1, day, startHour, startMinute);
                    const endDate = new Date(year, month - 1, day, endHour, endMinute);

                    // Adjust the time zone offset to '+05:30'
                    const TIMEOFFSET = '+05:30';
                    startDate.setHours(startDate.getHours() - 5);
                    startDate.setMinutes(startDate.getMinutes() - 30);
                    endDate.setHours(endDate.getHours() - 5);
                    endDate.setMinutes(endDate.getMinutes() - 30);

                    // Format the dates as 'YYYY-MM-DDThh:mm:ss+00:00'
                    const formatDate = (date) => {
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        const hours = String(date.getUTCHours()).padStart(2, '0');
                        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
                        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
                    };

                    const startDateFormatted = formatDate(startDate);
                    const endDateFormatted = formatDate(endDate);

                    console.log()

                    const event = {
                        'summary': `Meeting with Client`,
                        'description': `A meeting has been set with Client`,
                        'start': {
                            'dateTime': startDateFormatted,
                            'timeZone': 'Asia/Kolkata'
                        },
                        'end': {
                            'dateTime': endDateFormatted,
                            'timeZone': 'Asia/Kolkata'
                        }
                    };
                    console.log(event)
                    await fetch('http://localhost:5000/api/slot/create-event',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            event
                        }),
                    });

                } else {
                    console.error('Failed to send email:', emailResponse.statusText);
                }


            } else {
                console.error('Failed to delete slot:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting slot:', error);
        }
    };

    return (
        <div className="slot-container">
            <div className="slot-content">
                <span className="slot-time">{time}</span>
                {admin ? (
                    <button className="select-button-delete" onClick={handleDelete}>Delete</button>
                ) : (
                    <button className="select-button" onClick={handleBooking}>Book</button>
                )}
            </div>
        </div>
    );
};

export default Slot;
