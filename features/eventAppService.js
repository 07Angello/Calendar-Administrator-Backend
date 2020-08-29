const { response } = require('express');

// POST: api/event/
const createEvent = async(req, res = response) => {
    res.json({
        Message: 'Create event',
        Data: null
    });
}

// GET: api/event/:id
const getEvent = (req, res = response) => {
    res.json({
        Message: 'Get event',
        Data: null
    });
}

// UPDATE: api/event/:id
const updateEvent = async(req, res) => {
    res.json({
        Message: 'Update Event',
        Data: null
    });
}

// DELETE: api/event/:id
const deleteEvent = async(req, res) => {
    res.json({
        Message: 'Delete Event',
        Data: null
    });
}


module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
}