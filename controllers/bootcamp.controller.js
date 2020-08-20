
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Get All Bootcamps 
// @route   GET /api/v1/bootcamps
// @access  public
exports.GetBootcamps = asyncHandler(async (req, res, next) => {
    var bootcamps = await Bootcamp.find();
    res.status(200).json({ sucess: true, msg: "Get All Bootcamps", data: bootcamps });
});

exports.GetBootcampById = asyncHandler(async (req, res, next) => {
    var bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        sucess: true,
        data: bootcamp,
        msg: "Get Single Bootcamp Quried By Id " + req.params["id"]
    });
});

exports.CreateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ sucess: true, msg: "Created a Bootcamp Sucessfully", data: bootcamp });
})

exports.UpdateBootcamp = asyncHandler(async (req, res, next) => {

    var bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ sucess: true, msg: "Update a Bootcamp Sucessfully", data: bootcamp });
})

exports.DeleteBootcamp = asyncHandler(async (req, res, next) => {

    var bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ sucess: true, msg: "Delete a Bootcamp Sucessfully" });
})