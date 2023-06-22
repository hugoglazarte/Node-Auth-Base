const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');  

const createUser = async(req, res = response) => {

    try {
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(req.body.password, salt);
        await user.save();

        const token = await generateJWT(user.id, user.name);
        res.json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        const err = new ErrorResponse(500, 'app.createUser.error', 'Ocurrio un error al crear el nuevo usuario');
        res.status(err.statusCode).json(modelToJson(err));
    };

};

const loginUser = async(req, res = response) => {

    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        const token = await generateJWT(user.id, user.name);
        res.json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        const err = new ErrorResponse(500, 'app.loginUser.error', 'Ocurrio un error al intentar hacer el login');
        res.status(err.statusCode).json(modelToJson(err));
    };

};

const renew =  async(req, res = response) => {

    const { id, name } = req;
    const token = await generateJWT(id, name);

    res.json({
        ok: true,
        msg: 'renew',
        id,
        name,
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    renew
};