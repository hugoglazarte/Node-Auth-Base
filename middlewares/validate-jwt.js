const { response } = require('express');
const jwt = require('jsonwebtoken');
const { ErrorResponse, modelToJson } = require('../models/ErrorResponse');

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        const err = new ErrorResponse(401, 'app.validateJWT.error', 'No hay token en header');
        return res.status(err.statusCode).json(modelToJson(err));
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        req.id = payload.id;
        req.name = payload.name;

        next();
        
    } catch (error) {
        const err = new ErrorResponse(401, 'app.validateJWT.error', 'Token no valido');
        return res.status(err.statusCode).json(modelToJson(err));
    }

    
}

module.exports = {
    validateJWT
}