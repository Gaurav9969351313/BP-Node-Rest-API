const express = require('express');
const router = express.Router();

const { GetBootcamps, 
        GetBootcampById, 
        CreateBootcamp, 
        UpdateBootcamp, 
        DeleteBootcamp } = require('../controllers/bootcamp.controller');

router.route('/')
        .get(GetBootcamps)
        .post(CreateBootcamp);

router.route('/:id')
        .put(UpdateBootcamp)
        .get(GetBootcampById)
        .delete(DeleteBootcamp)

module.exports = router;