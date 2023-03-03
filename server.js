const express = require('express');
const app = express();

const dataset = 'data.json';

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const data = require(dataset)

app.get('/journeys/:journey', function(req, resp){
    const journey = req.params.journey;
    
});


