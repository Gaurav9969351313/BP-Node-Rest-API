const express = require('express');
const router = express.Router();

const advancedResults = require('../middlewares/advanceResults');
const Bootcamp = require('../models/Bootcamp'); 
const { protect, authorize } = require('../middlewares/auth');

const { GetBootcamps, 
        GetBootcampById, 
        CreateBootcamp, 
        UpdateBootcamp, 
        DeleteBootcamp } = require('../controllers/bootcamp.controller');

// Include Other Resource Router and then re-route to other resource router
const courseRouter = require('./courses.routes');
router.use('/:bootcampId/courses', courseRouter);

router.route('/')
        .get(advancedResults(Bootcamp, 'courses'), GetBootcamps)
        .post(CreateBootcamp);

router.route('/:id')
        .put(UpdateBootcamp)
        .get(GetBootcampById)
        .delete(protect, authorize('publisher', 'admin'), DeleteBootcamp)

module.exports = router;