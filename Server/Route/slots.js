const express = require('express');
const router = express.Router();
const Slot = require('../Model/slots'); // Adjust the model path as needed


// Fetch all slots for a specific date
router.get('/getslots/:date', (req, res) => {
    const { date } = req.params;
    console.log(date);
    if (!date) {
        return res.status(422).json({ error: 'Please provide a date' });
    }

    Slot.findAll({ where: { date } })
        .then(savedSlot =>{
            if(!savedSlot){
                return res.status(422).json({ error: 'No slots Available' });
            }
            const {time} = savedSlot;
            console.log(21);
            res.status(200).json({slots:{time}});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error fetching slots' });
        });
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

module.exports = router;
