/*
    Event Routes / Event
    host + /api/event
*/
const express = require('express');
const router = express.Router();

const {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
} = require('../features/eventAppService');


router.post('/', createEvent);

router.get('/:id', getEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;
