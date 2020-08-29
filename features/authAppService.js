const { response } = require('express');

// POST: api/auth/register/
const createUser = async(req, res = response) => {
    
    res.json({
        Message: 'Register',
        Data: null
    });
}

// GET: api/auth/renew/
const renewToken = async(req, res = response) => {

    res.json({
        Message: 'renew',
        Data: null
    });
}

module.exports = {
    createUser,
    renewToken,
}