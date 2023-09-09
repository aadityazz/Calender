import React from 'react';
import '../Styles/Slot.css'; // Import the CSS file for styling

const Slot = ({ time, date, admin }) => {

    const gapi = window.gapi;

    const CLIENT_ID = "374889236058-ebpaj2qsbpetngpu1mk5vjqi33gfbjde.apps.googleusercontent.com"
    const API_KEY = "AIzaSyDnwTz0HimwS1r7OI23Hy9qJDpYBskPytc"
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const handleEventClick = () => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {

                    const event = {
                        'summary': 'Awesome Event!',
                        'location': 'India',
                        'description': 'Meeting with the Client',
                        'start': {
                            'dateTime': '2020-06-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2020-06-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                        ],
                        'attendees': [
                            {'email': 'adigpt0022@gmail.com'},
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                {'method': 'email', 'minutes': 24 * 60},
                                {'method': 'popup', 'minutes': 10}
                            ]
                        }
                    }

                    const request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
                    })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })

                })
        })
    }


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

                    handleEventClick();

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
