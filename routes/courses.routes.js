const express = require('express');
const router = express.Router({ mergeParams: true });
const { GetCourses, GetCourseById, CreateCourse, UpdateCourse, DeleteCourse } = require('../controllers/course.controller');

router.route('/')
        .get(GetCourses)
        .post(CreateCourse)

router.route('/:id')
        .get(GetCourseById)
        .put(UpdateCourse)
        .delete(DeleteCourse)

module.exports = router;