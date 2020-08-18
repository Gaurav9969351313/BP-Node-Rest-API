// @desc    Get All Bootcamps 
// @route   GET /api/v1/bootcamps
// access   Public
exports.GetBootcamps = (req,res,next) => {
    res.status(200).json({ sucess: true, msg: "Get All Bootcamps" }); 
}

exports.GetBootcampById = (req,res,next) => {
    res.status(200).json({ sucess: true, msg: "Get Single Bootcamp Quried By Id " + req.params["id"] });
}

exports.CreateBootcamp = (req,res,next) => {
    res.status(201).json({ sucess: true, msg: "Created a Bootcamp" }); 
}

exports.UpdateBootcamp = (req,res,next) => {
    res.status(200).json({ sucess: true, msg: "Update a Bootcamp" }); 
}

exports.DeleteBootcamp = (req,res,next) => {
    res.status(200).json({ sucess: true, msg: "Delete a Bootcamp" }); 
}