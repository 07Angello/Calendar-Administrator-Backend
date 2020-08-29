/*
    User Routes / Auth
    host + /api/auth
*/
const express = require('express');
const router = express.Router();

const { 
    createUser,
    loginUser,
    renewToken,
} = require('../features/authAppService');


router.post('/register', createUser);

router.post('/', loginUser)

router.get('/renew', renewToken);


module.exports = router;
