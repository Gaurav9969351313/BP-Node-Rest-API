// Simple Rest Server
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const CookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const xss = require('xss-clean');
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();


// Body Parser
app.use(express.json());

// Cors
app.use(cors());

app.use(mongoSanitize());
app.use(CookieParser());

// Set Security Headers
app.use(helmet());

// Avoid XSS
app.use(xss());

// hpp attack prevention: http parameter prevention
app.use(hpp())

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Load Route Files 
const BootcampRoutes = require('./routes/bootcamps.routes');
const CourseRoutes = require('./routes/courses.routes');
const UsersRoutes = require('./routes/users.routes');
const ReviewsRoutes = require('./routes/reviews.routes');

// Load Middlewares
const logger = require('./middlewares/logger');
// app.use(logger);
if (process.env.NODE_ENV == 'developement') {
    app.use(morgan('dev'));
}

// Mount the routes 
app.use('/api/v1/bootcamp', BootcampRoutes);
app.use('/api/v1/course', CourseRoutes);
app.use('/api/v1/user', UsersRoutes);
app.use('/api/v1/review', ReviewsRoutes);

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
