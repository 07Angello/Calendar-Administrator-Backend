/*
    Event Routes
    host + /api/events
*/
const express = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const {
    createEvent,
    getEvent,
    getPaginatedEvents,
    updateEvent,
    deleteEvent,
} = require('../features/eventAppService');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { isDate } = require('../helpers/isDate');

const router = express.Router();
router.use( jwtValidator );

router.post('/',
    [
        check('title', 'The description is required.').not().isEmpty(),
        check('start', 'Start Date is required.').custom( isDate ),
        check('end', 'End Date is required.').custom( isDate ),
        fieldsValidator
    ],
    createEvent);

router.get('/:id',
    getEvent);

router.get('/',
    getPaginatedEvents);

router.put('/:id',
    [
        check('title', 'The description is required.'),
        check('start', 'Start Date is required.').custom( isDate ),
        check('end', 'End Date is required.').custom( isDate ),
        fieldsValidator
    ],
    updateEvent);

router.delete('/:id',
    deleteEvent);


module.exports = router;
