// @desc    Get All Bootcamps 
// @route   GET /api/v1/bootcamps

const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

// access   Public
exports.GetBootcamps = async (req, res, next) => {
    try {
        var bootcamps = await Bootcamp.find();
        res.status(200).json({ sucess: true, msg: "Get All Bootcamps", data: bootcamps });
    } catch (error) {
        next(error);
    }
}

exports.GetBootcampById = async (req, res, next) => {
    try {
        var bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            // return res.status(400).json({ sucess: false });
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            sucess: true,
            data: bootcamp,
            msg: "Get Single Bootcamp Quried By Id " + req.params["id"]
        });
    } catch (error) {
        next(error);
        // next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

}

exports.CreateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ sucess: true, msg: "Created a Bootcamp Sucessfully", data: bootcamp });
    } catch (error) {
        next(error)
    }

}

exports.UpdateBootcamp = async (req, res, next) => {
    try {
        var bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({ sucess: true, msg: "Update a Bootcamp Sucessfully", data: bootcamp });
    } catch (error) {
        next(error);
    }
}

exports.DeleteBootcamp = async (req, res, next) => {
    try {
        var bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({ sucess: true, msg: "Delete a Bootcamp Sucessfully" });
    } catch (error) {
        next(error);
    }
}