const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");

// @desc      Get all users
// @route     GET /api/v1/user
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get single user
// @route     GET /api/v1/user/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc      Create user
// @route     POST /api/v1/user
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    sendTokenResponse(user, 200, res);
});

// @desc      Update user
// @route     PUT /api/v1/user/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc      Delete user
// @route     DELETE /api/v1/user/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});

// ################################## Auth Logic ##########################################
// @desc      Create user
// @route     POST /api/v1/user/auth/login
// @access    Private/Admin
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // validating email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Check Password Match or not
    const isPassMatch = await user.matchPassword(password);

    if (!isPassMatch) {
        return next(new ErrorResponse('Invalid Credentials, Password Not Matched', 401));
    }

    sendTokenResponse(user, 200, res);
});

// Get Token From Model, Create A Coocke and send the Response 
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJWTToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 3600 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

// @desc      Get Current LoggedIn User
// @route     POST /api/v1/user/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ 
        success: true,
        data: user
    })
})

// @desc      Logout / Clearing Cookie
// @route     GET /api/v1/user/auth/logout
// @access    pubic
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', { 
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
     })

    res.status(200).json({ 
        success: true,
        data: {}
    })
})

