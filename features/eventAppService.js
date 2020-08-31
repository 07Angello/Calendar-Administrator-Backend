const { response } = require('express');
const Event = require('../models/Event');

// POST: api/events/
const createEvent = async( req, res = response ) => {

    const newEvent = new Event( req.body );

    try {
        newEvent.user = req.uid;
        
        const savedEvent = await newEvent.save();

        return res.status(201).json({
            Message: '',
            Data: savedEvent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: 'The event could not be created.',
            Data: null
        });
    }
}

// GET: api/events/:id
const getEvent = async( req, res = response ) => {
    return res.status(201).json({
        Message: 'Get event',
        Data: null
    });
}

// GET: api/events/
const getEvents = async( req, res = response ) => {
    const events = await Event.find()
                                .populate('user', 'name');

    if ( events.length === 0 ) {
        return res.status(201).json({
            Message: 'There are no events registered.',
            Data: null
        });
    }

    return res.status(201).json({
        Message: '',
        Data: events
    });
}

// UPDATE: api/events/:id
const updateEvent = async(req, res) => {
    const idEvent = req.params.id;
    const uid = req.uid;

    try {
        const consultedEvent = await Event.findById( idEvent );

        if ( !consultedEvent ) {
            return res.status(404).json({
                Message: 'The event you want to update, could not be found.',
                Data: null
            });
        }

        if ( consultedEvent.user.toString() !== uid ) {
            return res.status(401).json({
                Message: 'You do not have permission to EDIT this event.',
                Data: null
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( idEvent, newEvent, { new: true } );

        return res.status(201).json({
            Message: '',
            Data: updatedEvent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: 'Event could not be created'
        });
    }
}

// DELETE: api/events/:id
const deleteEvent = async(req, res) => {
    const idEvent = req.params.id;
    const uid = req.uid;

    try {
        const consultedEvent = await Event.findById( idEvent );
        if ( !consultedEvent ) {
            return res.status(404).json({
                Message: 'The event you tried to delete, could not be found.',
                Data: null
            });
        }

        if ( consultedEvent.user.toString() !== uid ) {
            return res.status().json({
                Message: 'You do not have permission to DELETE this event.',
                Data: null
            });
        }

        await Event.findByIdAndDelete( idEvent );

        return res.status(201).json({
            Message: '',
            Data: consultedEvent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: 'The event could not be deleted.',
            Data: null
        });
    }
}

module.exports = {
    createEvent,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent,
}
