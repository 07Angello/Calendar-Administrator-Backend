const { response } = require('express');

// POST: api/auth/register/
const createUser = async(req, res = response) => {
    const userReq = req.body;

    return res.status(201).json({
        Message: 'createUser',
        Data: userReq
    });
}

// POST: api/auth/
const loginUser = async (req, res = response) => {
    const userReq = req.body;

    return res.json({
        Message: 'login',
        Data: userReq
    });
}

// GET: api/auth/renew/
const renewToken = async(req, res = response) => {
    const userReq = req.body;

    return res.json({
        Message: 'renew',
        Data: userReq
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}