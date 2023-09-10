const express = require('express');
const router = express.Router();
const Slot = require('../Model/slots'); // Adjust the model path as needed
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);



// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });

        console.log("Resp: " + JSON.stringify(response));

        if (response['statusText'] === 'OK') {
            console.log("Event has been created")
            return 1;
        } else {
            console.log("Event hasn't been created")
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};


// Define an API endpoint for sending emails
router.post('/send-email', async (req, res) => {
    try {
        const { recipientEmail, subject, text } = req.body;

        const testAccount = await nodemailer.createTestAccount();
        // Create a transporter object using your email service (e.g., Gmail)
        const transporter = await nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'erin.ferry@ethereal.email',
                pass: 'Sdy49FuQua5NWryXmG'
            }
        });

        const info = await transporter.sendMail({
            from: '"Developer " <erin.ferry@ethereal.email>', // sender address
            to: `${recipientEmail}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: `${text}`, // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        // Log the URL to access the sent email in Ethereal
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});


// Fetch all slots for a specific date
router.get('/getslots/:date', async (req, res) => {
    console.log("api hit");
    const { date: requestDate } = req.params;

    try {
        const savedSlot = await Slot.findAll({ where: { date: requestDate.replace(/-/g, '/') } });
        console.log(savedSlot);

        if (!savedSlot || savedSlot.length === 0) {
            return res.status(422).json({ error: 'No slots Available' });
        }

        const slotsData = savedSlot.map(slot => ({
            time: slot.time,
        }));

        console.log(slotsData);
        res.status(200).json({slot: slotsData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching slots' });
    }
});



// save slot
router.post('/saveslot', async (req, res) => {
    console.log("api slot hit");
    const { date, time} = req.body;
    console.log(date);
    console.log(time);
    if (!date) {
        return res.status(400).json({ error: 'Date is required' });
    }

    try {
        // Create a new slot entry
        const newSlot = await Slot.create({
            date,
            time
        });

        res.json({ message: 'Slot saved successfully', slot: newSlot });
    } catch (error) {
        console.error('Error saving poll:', error);
        res.status(500).json({ error: 'Error saving poll' });
    }
});

// Define a route to delete a slot by ID
router.delete('/delete', async (req, res) => {
    const { time, date } = req.body; // Get time and date from the request body
    console.log(time);
    console.log(date)
    try {
        // Find the slot by time and date and delete it from your database
        const deletedSlot = await Slot.destroy({ where: { time, date } });

        if (deletedSlot === 0) {
            // If no slot was deleted (slot not found), return a 404 status
            return res.status(404).json({ error: 'Slot not found' });
        }

        // If the slot was successfully deleted, return a 204 (No Content) status
        res.sendStatus(204);

    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ error: 'Error deleting slot' });
    }
});

//
router.post('/create-event', async (req, res) => {
    console.log("create event api hit");
    const { event } = req.body;
    console.log(event);

    insertEvent(event)
        .then((res) => {
            return res.status(200).json({message: "Event has been created on calendar"});
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = router;
