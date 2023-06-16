const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt');  

const createUser = async(req, res = response) => {

    try {

        const { name, email, password} = req.body;

        let user = await User.findOne({ email });
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe con el mail cargado'
            });
        }
        
        user = new User(req.body);
        // Encrypting pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al crear el nuevo usuario'
        })
    };

};

const loginUser = async(req, res = response) => {

    try {

        const { email, password} = req.body;

        // validate email
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ 
                ok: false, 
                msg: 'No existe el usuario para ese email'
            });
        };
        
        // validate password
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({ 
                ok: false, 
                msg: 'El password es invalido'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al intentar hacer el login'
        })
    };

};

const renew =  async(req, res = response) => {

    const { id, name } = req;
    // renew token:
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