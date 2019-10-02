const request = require('../request');
const db = require('../db');

jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

getLocation.mockResolvedValue({
  latitude: 45.5320561,
  longitude: -122.6061411
});
getForecast.mockResolvedValue([
  {
    time: '2019-10-02T07:00:00.000Z',
    forecast: 'Possible drizzle overnight.',
    high: 63.29,
    low: 47.07
  },
  {
    time: '2019-10-03T07:00:00.000Z',
    forecast: 'Cloudy with snow at high elevations.',
    high: 50.89,
    low: 38.13
  }
]);

describe('Stops API Routes', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('tours'),
      db.dropCollection('stops')
    ]);
  });

  const tour = {
    title: 'Harry Potter on Ice',
    activities: ['Day at Diagon Alley', 'Quidditch Match', 'Battle at Hogwarts']
  };

  const stop = {
    address: '11101'
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a stop', () => {
    return postTour(tour).then(tour => {
      return request
        .post(`/api/stops/${tour._id}`)
        .send(stop)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              __v: 0,
              _id: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "location": Object {
                "latitude": 45.5320561,
                "longitude": -122.6061411,
              },
              "weather": Object {
                "forecast": "Possible drizzle overnight.",
                "time": "2019-10-02T07:00:00.000Z",
              },
            }
          `
          );
        });
    });
  });

  it('deletes a stop', () => {
    return postTour(tour).then(tour => {
      return request
        .post(`/api/stops/${tour._id}`)
        .send(stop)
        .expect(200)
        .then(({ body }) => {
          const stopId = body._id;
          return request
            .delete(`/api/stops/${tour._id}`)
            .send({ id: stopId })
            .expect(200)
            .then(() => {
              return request.get('/api/tours').then(({ body }) => {
                expect(body[0].stops).toEqual([]);
              });
            });
        });
    });
  });

  it('updates a stop with attendance', () => {
    return postTour(tour).then(tour => {
      return request
        .post(`/api/stops/${tour._id}`)
        .send(stop)
        .expect(200)
        .then(({ body }) => {
          const stopId = body._id;
          return request
            .put(`/api/stops/${tour._id}`)
            .send({ id: stopId, attendance: 15 })
            .expect(200)
            .then(({ body }) => {
              expect(body.attendance).toBe(15);
            });
        });
    });
  });
});
