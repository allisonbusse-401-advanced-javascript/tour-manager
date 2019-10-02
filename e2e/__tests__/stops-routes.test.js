const request = require('../request');
const db = require('../db');

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

  const tourTwo = {
    title: 'The Sound of Music',
    activities: ['Singing', 'Sewing Clothes', 'Swimming']
  };

  const stop = {
    address: '11101'
  };

  const stopTwo = {
    address: '97214'
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
                "latitude": 40.7443091,
                "longitude": -73.9418603,
              },
              "weather": Object {
                "forecast": "Mostly cloudy throughout the day.",
                "time": "2019-10-01T04:00:00.000Z",
              },
            }
          `
          );
        });
    });
  });
});
