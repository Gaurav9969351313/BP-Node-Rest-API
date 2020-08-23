
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Get All Bootcamps 
// @route   GET /api/v1/bootcamps
// @access  public
exports.GetBootcamps = asyncHandler(async (req, res, next) => {
    let Query;
    const reqQuery = { ...req.query };
    let tobeRemoved = ['select', 'sort', 'page', 'limit']

    tobeRemoved.forEach(p => delete reqQuery[p]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|lte|lt|lte|in)\b/g, match => `$${match}`);
    console.log(queryStr);
    Query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    if (req.query["select"]) {
        const fields = req.query["select"].split(',').join(' ');
        Query = Query.select(fields);
    }

    if (req.query["sort"]) {
        const sortBy = req.query["sort"].split(',').join(' ');
        Query = Query.sort(sortBy);
    } else {
        Query = Query.sort('-avgRating')
    }

    const page = parseInt(req.query["page"], 10) || 1;
    const limit = parseInt(req.query["limit"], 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = Bootcamp.countDocuments();

    Query = Query.skip(startIndex).limit(limit);

    var bootcamps = await Query;

    // Pagination Result
    const paginationControls = {};
    if (endIndex < total) {
        paginationControls.next = { page: page + 1, limit }
    }
    if (startIndex > 0) {
        paginationControls.prev = { page: page - 1, limit }
    }

    res.status(200).json({ sucess: true, msg: "Get All Bootcamps", 
                           pagination: paginationControls,
                           count: bootcamps.length, data: bootcamps });
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

    var bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    bootcamp.remove();

    res.status(200).json({ sucess: true, msg: "Delete a Bootcamp Sucessfully" });
})