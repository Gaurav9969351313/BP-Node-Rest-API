// Simple Rest Server
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });
const app = express();

// Load Route Files 
const BootcampRoutes = require('./routes/bootcamps.routes');

// Load Middlewares
const logger = require('./middlewares/logger');

// app.use(logger);
if (process.env.NODE_ENV == 'developement') {
    app.use(morgan('dev'));
}

// Mount the routes 
app.use('/api/v1/bootcamp', BootcampRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running on " + PORT + " mode " + process.env.NODE_ENV));



