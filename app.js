const express = require('express');
const app = express();

const fs = require('fs');

const planeJSON = './plane.json';
const journeyJSON = './journey.json'

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const planes = require(planeJSON);
const journeys = require(journeyJSON)

app.get('/journeys/:journey', (req,resp) => {
    const journey = req.params.journey
    const details = journeys[journey]

    resp.send(details)
})

app.get('/journeys', function (req, resp) {
    const journeyValues = Object.values(journeys);
    resp.send(journeyValues);
});

app.get('/planes', function (req, resp) {
    const planeValues = Object.values(planes);
    resp.send(planeValues);
});

module.exports = app;