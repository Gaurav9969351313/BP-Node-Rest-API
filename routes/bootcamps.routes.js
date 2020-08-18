const express = require('express');
const router = express.Router();


router.get('/', (req, res)=> {
    // res.status(200).send("Get All Items");
    res.status(200).json({ sucess: true, msg: "Get All Items" }) 
})

router.get('/:id', (req, res)=> {
    res.status(200).send("Get Single Item");
})

router.post('/', (req, res)=> {
    res.status(201).send("Creation of resource");
})

router.put('/:id', (req, res)=> {
    console.log("Passed Id in url", req.query.id);
    res.send("Update the resource");
})

router.delete('/:id', (req, res)=> {
    res.send("Remove the perticular resource");
})

module.exports = router;