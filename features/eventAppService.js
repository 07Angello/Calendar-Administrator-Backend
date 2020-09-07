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
    const idEvent = req.params.id;

    try {
        const consultedEvent = await Event.findById( idEvent );
        if ( !consultedEvent ) {
            return res.status(404).json({
                Message: 'This event does not exist.',
                Data: null
            });
        }

        return res.status(201).json({
            Message: '',
            Data: consultedEvent
        });
    } catch (error) {
        return res.status(500).json({
            Message: 'The event could not be consulted.',
            Data: null
        });
    }

}

// GET: api/events/
const getPaginatedEvents = async( req, res = response ) => {
    const { pageNumber, searchedEvent } = req.body;

    const resultsPerPage = 10;

    const pgNumber = pageNumber == 0 ? 0 : Number(pageNumber);
    const srchEvent = searchedEvent == null || searchedEvent == '' ? '' : searchedEvent;

    const filterLike = new RegExp(srchEvent, 'i');
    const from = resultsPerPage * pgNumber;


    await Event.find({ "title": filterLike })
            .skip( from )
            .limit( resultsPerPage )
            .sort( 'start' )
            .populate( 'user', 'name' )
            .exec(( err, events ) => {
                if ( err ) {
                    return res.status(400).json({
                        Data: null,
                        Message: 'Could not found events.'
                    });
                }

                if ( !events ) {
                    return res.status(404).json({
                        Message: 'There are no registered events.',
                        Data: null
                    });
                }

                return res.status(201).json({
                    Message: '',
                    Data: events
                });
            });

}

// GET: api/events/all
const getAllEvents = async(req, res = response) => {

    try {
        const events = await Event.find()
        .populate('user', 'name');

        if ( !events ) {
            return res.status(404).json({
                Message: 'There are no registered events.',
                Data: null
            });
        }

        return res.status(201).json({
            Message: '',
            Data: events
        });
    } catch (error) {
        return res.status(500).json({
            Message: 'Could not get any events.',
            Data: null
        });
    }

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
    getAllEvents,
    getPaginatedEvents,
    updateEvent,
    deleteEvent,
}
