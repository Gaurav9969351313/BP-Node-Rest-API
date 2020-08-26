
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @desc   Get All Courses
// @route  GET api/v1/courses
// @route  GET api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.GetCourses = asyncHandler(async (req, res, next) => {
    let Query;

    if (req.params["bootcampId"]) {
        const courses = await Course.find({ bootcamp: req.params["bootcampId"] })
        res.status(200).json({ sucess: true, msg: "Get Courses by bootcampId", 
                           count: courses.length, data: courses });
    } else {
        // Query = Course.find().populate('bootcamp');
        // Query = Course.find().populate({
        //     path: 'bootcamp',
        //     select: 'name description'
        // })

        res.status(200).json(res.advancedResults);
    }    
});

exports.GetCourseById = asyncHandler(async (req, res, next) => {
    var course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        sucess: true,
        data: course,
        msg: "Get Single Course Quried By Id " + req.params["id"]
    });
});

// Course is associated with bootcamp id so need to find the bootcamp id first and then add it
// @route   POST api/v1/bootcamps/:bootcampId/courses
// @access  private
exports.CreateCourse = asyncHandler(async (req, res, next) => {

    req.body["bootcamp"] = req.params["bootcampId"];
    var bootcamp = await Bootcamp.findById(req.params["bootcampId"]);

    if (bootcamp) {
        return next(new ErrorResponse(`No Bootcamp found with id ${req.params.bootcampId}`, 404))
    }

    const course = await Course.create(req.body);
    
    res.status(201).json({ sucess: true, msg: "Created a Course Sucessfully", data: course });
})

exports.UpdateCourse = asyncHandler(async (req, res, next) => {

    var course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ sucess: true, msg: "Update a Course Sucessfully", data: course });
})

exports.DeleteCourse = asyncHandler(async (req, res, next) => {

    var course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }

    course.remove();

    res.status(200).json({ sucess: true, msg: "Delete a Course Sucessfully" });
})
