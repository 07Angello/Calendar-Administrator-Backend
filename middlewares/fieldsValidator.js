const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidator = ( req, res = response, next ) => {
    const fieldValidations = validationResult( req );

    if( !fieldValidations.isEmpty() ) {
        const fieldErrorMessage = fieldValidations.errors[0].msg;
        
        return res.status(400).json({
            Message: fieldErrorMessage,
            Data: null
        });
    }

    next();
}

module.exports = {
    fieldsValidator,
}