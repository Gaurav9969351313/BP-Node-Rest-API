// Simple Rest Server
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamp', (req, res)=> {
    // res.status(200).send("Get All Items");
    res.status(200).json({ sucess: true, msg: "Get All Items" }) 
})

app.get('/api/v1/bootcamp/:id', (req, res)=> {
    res.status(200).send("Get Single Item");
})

app.post('/api/v1/bootcamp', (req, res)=> {
    res.status(201).send("Creation of resource");
})

app.put('/api/v1/bootcamp/:id', (req, res)=> {
    console.log("Passed Id in url", req.query.id);
    res.send("Update the resource");
})

app.delete('/api/v1/bootcamp/:id', (req, res)=> {
    res.send("Remove the perticular resource");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running on " + PORT + "mode " + process.env.NODE_ENV));



