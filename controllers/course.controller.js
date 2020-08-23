
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Course = require("../models/Course");

// @desc   Get All Courses
// @route  GET api/v1/courses
// @route  GET api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.GetCourses = asyncHandler(async (req, res, next) => {
    let Query;

    if (req.params["bootcampId"]) {
        Query = Course.find({ bootcamp: req.params["bootcampId"] })
    } else {
        Query = Course.find();
    }

    const courses = await Query;

    res.status(200).json({ sucess: true, msg: "Get All Courses", 
                           count: courses.length, data: courses });
});
