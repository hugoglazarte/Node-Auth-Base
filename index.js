const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const app = express();
require('dotenv').config();

// DabaBase initialization
dbConnection();
// CORS
app.use(cors());
// Index LoadingPage
app.use( express.static('public') )
// Json Parser
app.use( express.json() );

// Auth Routes
app.use('/api/auth', require('./routes/auth'))
app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en: ' + process.env.PORT)
});