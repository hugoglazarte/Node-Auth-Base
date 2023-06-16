const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {
        await mongoose.connect(process.env.DB_CNN, {});
        console.log(`Se inicializo la conexion a DB`)
    } catch (error) {
        console.log(error);
        throw new Error(`Error a la hora de inicializar conexion a DB`);    
    }

}

module.exports = {
    dbConnection
}