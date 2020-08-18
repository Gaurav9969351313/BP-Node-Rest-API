// Simple Rest Server
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const app = express();

// Load Route Files 
const BootcampRoutes = require('./routes/bootcamps.routes');

// Mount the routes 
app.use('/api/v1/bootcamp', BootcampRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running on " + PORT + " mode " + process.env.NODE_ENV));



