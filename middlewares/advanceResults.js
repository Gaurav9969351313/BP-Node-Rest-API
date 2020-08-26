const advancedResults = (whichModel, whatToPopulate) => async (req,res,next) => {
    let Query;
    const reqQuery = { ...req.query };
    let tobeRemoved = ['select', 'sort', 'page', 'limit']

    tobeRemoved.forEach(p => delete reqQuery[p]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|lte|lt|lte|in)\b/g, match => `$${match}`);
    console.log(queryStr);
    Query = whichModel.find(JSON.parse(queryStr));

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
    const total = whichModel.countDocuments();

    Query = Query.skip(startIndex).limit(limit);

    if (whatToPopulate) {
        Query = Query.populate(whatToPopulate)
    }

    var results = await Query;

    // Pagination Result
    const paginationControls = {};
    if (endIndex < total) {
        paginationControls.next = { page: page + 1, limit }
    }
    if (startIndex > 0) {
        paginationControls.prev = { page: page - 1, limit }
    }

    res.advancedResults = {
        sucess: true,
        count: results.length,
        paginationControls,
        data: results
    }

    next()
}

module.exports = advancedResults;