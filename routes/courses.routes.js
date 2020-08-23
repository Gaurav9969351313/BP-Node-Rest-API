const express = require('express');
const router = express.Router({ mergeParams: true });
const { GetCourses } = require('../controllers/course.controller');

router.route('/')
        .get(GetCourses)

module.exports = router;