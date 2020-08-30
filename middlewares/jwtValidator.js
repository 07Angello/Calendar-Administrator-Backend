const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = ( req, res = response, next ) => {
    // x-token in header
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            Data: null,
            Message: 'There is no token in the request.'
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            Message: 'Token is not valid.',
            Data: null
        });
    }

    next();
}

module.exports = {
    jwtValidator
}