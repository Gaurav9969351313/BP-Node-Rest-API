// Simple Rest Server
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Load Route Files 
const BootcampRoutes = require('./routes/bootcamps.routes');
const CourseRoutes = require('./routes/courses.routes');

// Load Middlewares
const logger = require('./middlewares/logger');
// app.use(logger);
if (process.env.NODE_ENV == 'developement') {
    app.use(morgan('dev'));
}

// Mount the routes 
app.use('/api/v1/bootcamp', BootcampRoutes);
app.use('/api/v1/course', CourseRoutes);

// ** Specific Use Case middleware after routes mounting 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
    console.log(`Server running on ${PORT} mode ${process.env.NODE_ENV}`.yellow.bold)
);


// Global Error Handler
// Which Handles Unhandled Promise Rejections
process.on('unhandledRejection', (err, Promise) => {
    console.log('Error: ', err.message);
    // Close The Server and Exit
    server.close(() => process.exit(1));
})
