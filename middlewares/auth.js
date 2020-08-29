const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// Protect Routes 
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new ErrorResponse('Not Authorise To Access This Route', 401));
    }

    try {
        // Verification Logic 
        jwt.verify(token, process.env.JWT_SECRET, async (err, res)=>{
            if (err) {
                console.log("Error", err);
                return next(new ErrorResponse('Invalid / Missing Token', 401));
            } else {
                // console.log(res);
            req.user = await User.findById(res["id"]);
            // console.log("From Auth MiddleWare: ", req.user);
            return next();
            }
        });
       
    } catch (error) {
        console.log(error);
        return next(new ErrorResponse('Invalid / Missing Token', 401));
    }
})  

// Grant Access To Specific Roles Only
exports.authorize = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User Role ${req.user.role} Is Un-Authorized To Access This Route`, 403));
        }
        next();
    }
}