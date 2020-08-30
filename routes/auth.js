/*
    User Authentication Routes
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { 
    createUser,
    loginUser,
    renewToken,
} = require('../features/authAppService');

const router = express.Router();

router.post(
    '/register',
    [
        check('name', 'The name is required.').not().isEmpty(),
        check('email', 'The email you entered is invalid.').isEmail(),
        check('password', 'The password should be more than 5 characters.').isLength({ min: 6 }),
        fieldsValidator
    ],
    createUser);

router.post(
    '/',
    [
        check('name', 'The name is required.').not().isEmpty(),
        check('email', 'The email you entered is invalid.').isEmail(),
        check('password', 'The password is required.').not().isEmpty(),
        fieldsValidator
    ],
    loginUser)

router.get('/renew-token', renewToken);


module.exports = router;
