const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const app = express();
require('dotenv').config();

dbConnection();
app.use(cors());
app.use( express.static('public') )
app.use( express.json() );

app.use('/api/auth', require('./routes/auth'))
app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en: ' + process.env.PORT)
});