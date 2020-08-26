const express = require('express');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advanceResults');
const Course = require('../models/Course'); 

const { GetCourses, GetCourseById, CreateCourse, UpdateCourse, DeleteCourse } = require('../controllers/course.controller');

router.route('/')
        .get(advancedResults(Course, {
                path: 'bootcamp',
                select: 'name description'
            }), GetCourses)
        .post(CreateCourse)

router.route('/:id')
        .get(GetCourseById)
        .put(UpdateCourse)
        .delete(DeleteCourse)

module.exports = router;