const express = require('express');
const app = express();

const planeJSON = './plane.json';
const journeyJSON = './journey.json';

const fs = require('fs');

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const planes = require(planeJSON);
const journeys = require(journeyJSON);

app.get('/journeys/:journey', (req, resp) => {
    const journey = req.params.journey;
    const details = journeys[journey];

    resp.send(details);
});

app.get('/journeys', function (req, resp) {
    const keys = Object.keys(journeys);
    resp.send(keys);
});

app.get('/planes', function (req, resp) {
    const planeValues = Object.values(planes);
    resp.send(planeValues);
});

app.get('/planes/:info', function (req, resp) {
    const plane = req.params.info;
    const send = plane;
    resp.send(send);
 });

app.post('/journeys/new', function (req, resp) {
    const start = req.params.start;
    const destination = req.params.destination;
    const distance = req.params.distance;
    const haul = req.params.haul;
    const passengers = req.params.passengers;
    const transcontinental = req.params.transcontinental;
    const key = start + '-' + destination;
    journeys[key].start = start;
    journeys[key].destination = destination;
    journeys[key].distance = distance;
    journeys[key].haul = haul;
    journeys[key].passengers = passengers;
    journeys[key].transcontinental = transcontinental;
    fs.writeFileSync(journeyJSON, JSON.stringify(journeys));
    resp.send(journeys);
 });

module.exports = app;
