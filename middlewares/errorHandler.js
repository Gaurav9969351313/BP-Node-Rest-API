const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    console.log(err);
    error.message = err.message;

    // Mongoose Bad Object Id
    if (err.name === 'CastError') {
        var message = `Id of ${err.value} Not Found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose Duplicate Value
    if (err.code === 11000) {
        var message = 'Duplicate field Value Entered';
        error = new ErrorResponse(message, 400)
    }

    // Mongoose Validation Error 
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({
        sucess:false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;