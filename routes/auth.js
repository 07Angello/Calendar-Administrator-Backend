/*
    User Routes / Auth
    host + /api/auth
*/

const express = require('express');
const router = express.Router();

const { 
    createUser,
    renewToken,
} = require('../features/authAppService');


router.post('/register', createUser);

router.get('/renew', renewToken);


module.exports = router;
