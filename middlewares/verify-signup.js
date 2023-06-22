const { response } = require('express');
const User = require('../models/User');
const { ErrorResponse, modelToJson } = require('../models/ErrorResponse');

const verifySignUp = async(req, res = response, next) => {

    try {
        const { email, name} = req.body;
        let user = await User.findOne({ name });
        if( user ){
            const err = new ErrorResponse(400, 'app.signup.error', 'Nombre de usuario ingresado ya existe');
            return res.status(err.statusCode).json(modelToJson(err));
        }
        user = await User.findOne({ email });
        if( user ){
            const err = new ErrorResponse(400, 'app.signup.error', 'Email ingresado ya existe');
            return res.status(err.statusCode).json(modelToJson(err));
        }

        next();

    } catch (error) {
        console.log(error);
        const err = new ErrorResponse(500, 'app.signup.error', 'Ocurrio un error al crear el nuevo usuario');
        res.status(err.statusCode).json(modelToJson(err));
    }
}

module.exports = {
    verifySignUp
}