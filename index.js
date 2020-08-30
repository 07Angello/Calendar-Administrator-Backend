const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use( express.static('public') );

app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/event'));


app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }...`);
} );