const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

 

// crear servidor de express
const app = express();

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Directorio Publico
app.use( express.static('public') );

// lectura y parseo del body
app.use( express.json() );

// rutas
app.use('/api/auth', require('./routes/auth')) /* Autenticacion */ 
app.use('/api/events', require('./routes/events')) /* Events */ 



// escuchar peticiones 
app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
} )