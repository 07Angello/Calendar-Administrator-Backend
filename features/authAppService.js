const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// POST: api/auth/register/
const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const isExistingUser = await User.findOne({ email: email });
        if( isExistingUser ) {
            return res.status(400).json({
                Message: 'An user already exists with this e-mail.',
                Data: null
            });
        }

        const newUser = new User( req.body );

        // encrypting password
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt );

        await newUser.save();

        newUser.password = '*******';
        return res.status(201).json({
            Message: '',
            Data: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: 'This user could not be created.',
            Data: null
        });
    }
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