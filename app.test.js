const request = require('supertest');
const app = require('./app');

describe('Test the get journeys service', () => {
    test('GET /journeys succeeds', () => {
        return request(app)
        .get('/journeys')
        .expect(200);
    });

    test('GET /journeys returns JSON', () => {
        return request(app)
        .get('/journeys')
        .expect('Content-type', /json/);
    });

    test('GET /journeys includes London-Paris', () => {
        return request(app)
        .get('/journeys')
        .expect(/London-Paris/);
    });

    test('GET /journeys/London-Paris succeeds', () => {
        return request(app)
        .get('/journeys/London-Paris')
        .expect(200);
    });

    test('POST /journeys/new', () => {
        const params = { start: 'Istanbul', destination: 'Edinburgh', distance: '2500 km', haul: 'Medium', passengers: '150', transcontinental: 'No' };
        return request(app)
        .post('/journeys/new')
        .send(params)
        .expect(200);
    });
});

describe('Test the get planes service', () => {
    test('GET /planes succeeds', () => {
        return request(app)
        .get('/planes')
        .expect(200);
    });

    test('GET /planes returns JSON', () => {
        return request(app)
        .get('/planes')
        .expect('Content-type', /json/);
    });

    test('GET /planes includes 11.jpg', () => {
        return request(app)
        .get('/planes')
        .expect(/"11.jpg"/);
    });

    test('GET /planes/Boeing787-9Dreamliner', () => {
        return request(app)
        .get('/planes/Boeing787-9Dreamliner')
        .expect(200);
    });

    test('POST /planes/new', () => {
        const params = { name: 'Boeing B787 Max 8', image: '17.jpg', range: '6570', speed: '975.4', passenger: '170', price: '112', info: 'Test' };
        return request(app)
        .post('/planes/new')
        .send(params)
        .expect(200);
    });
});
