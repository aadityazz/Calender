import React from 'react';
import '../Styles/Slot.css'; // Import the CSS file for styling
//import { google } from 'googleapis';

// Set up the OAuth client
// const oauth2Client = new google.auth.OAuth2(
//     '374889236058-ebpaj2qsbpetngpu1mk5vjqi33gfbjde.apps.googleusercontent.com',
//     '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',
//     'http://localhost:3000'
// );
//
//
// async function createCalendarEvent(auth, eventDetails) {
//     const calendar = google.calendar({ version: 'v3', auth });
//     try {
//         const calendarEvent = {
//             summary: eventDetails.summary,
//             location: eventDetails.location,
//             description: eventDetails.description,
//             start: {
//                 dateTime: eventDetails.startTime,
//                 timeZone: 'UTC', // Adjust as needed
//             },
//             end: {
//                 dateTime: eventDetails.endTime,
//                 timeZone: 'UTC', // Adjust as needed
//             },
//             attendees: [{ email: eventDetails.guestEmail }],
//         };
//
//         const response = await calendar.events.insert({
//             calendarId: 'primary', // Use 'primary' for the authenticated user's calendar
//             resource: calendarEvent,
//         });
//
//         return response.data.id; // Return the event ID if needed
//     } catch (error) {
//         console.error('Error creating event:', error);
//         throw error;
//     }
// }

const Slot = ({ time, date, admin }) => {
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
                } else {
                    console.error('Failed to send email:', emailResponse.statusText);
                }

                // Create a Google Calendar event
                // const eventDetails = {
                //     summary: 'Booking Appointment',
                //     location: 'Google Meet',
                //     description: 'Appointment with consultant',
                //     startTime: '2023-09-07T10:00:00Z', // Adjust with the actual start time
                //     endTime: '2023-09-07T11:00:00Z', // Adjust with the actual end time
                //     guestEmail: 'adigpt02@gmail.com', // Replace with the guest's email
                // };
                //
                // const eventId = await createCalendarEvent(oauth2Client, eventDetails);
                // console.log('Google Calendar Event ID:', eventId);
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
