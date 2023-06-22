const { response } = require('express');
const User = require('../models/User');
const { ErrorResponse, modelToJson } = require('../models/ErrorResponse');
const bcrypt = require('bcryptjs');

const verifySignIn = async(req, res = response, next) => {

    try {

        const { email, password} = req.body;
        let user = await User.findOne({ email });
        if(!user){
            const err = new ErrorResponse(400, 'app.verifySignIn.error', 'No existe el usuario para ese email');
            return res.status(err.statusCode).json(modelToJson(err));
        };
        
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            const err = new ErrorResponse(400, 'app.verifySignIn.error', 'El password es invalido');
            return res.status(err.statusCode).json(modelToJson(err));
        }

        next();
        
    } catch (error) {
        console.log(error);
        const err = new ErrorResponse(500, 'app.verifySignIn.error', 'Ocurrio un error al ingresar');
        res.status(err.statusCode).json(modelToJson(err));
    }

}

module.exports = {
    verifySignIn
}