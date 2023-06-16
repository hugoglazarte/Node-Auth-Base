const { Schema, model } = require('mongoose');

// Creamos el esquema de modelo de usuarios
const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }},
    { timestamps: true }
);

// exportamos el schema de user
module.exports = model('User', UserSchema);