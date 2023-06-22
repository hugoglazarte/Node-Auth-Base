const { response } = require('express');
const { validationResult } = require('express-validator');
const { ErrorResponse, modelToJson } = require('../models/ErrorResponse');

const validateFields = (req, res = response, next) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        console.log(errors.mapped())
        const err = new ErrorResponse(400, 'app.validateFields.error', errors.mapped());
        return res.status(err.statusCode).json(modelToJson(err));
    }

    next();
}

module.exports = {
    validateFields
}