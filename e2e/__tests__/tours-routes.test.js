const request = require('../request');
const db = require('../db');

describe('Tours API Routes', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tour = {
    title: 'Harry Potter on Ice',
    activities: ['Day at Diagon Alley', 'Quidditch Match', 'Battle at Hogwarts']
  };

  const tourTwo = {
    title: 'The Sound of Music',
    activities: ['Singing', 'Sewing Clothes', 'Swimming']
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(tour).then(postedTour => {
      expect(postedTour).toMatchInlineSnapshot(
        {
          ...tour,
          __v: 0,
          _id: expect.any(String),
          launchDate: expect.any(String),
          stops: expect.any(Array)
        },
        `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "activities": Array [
              "Day at Diagon Alley",
              "Quidditch Match",
              "Battle at Hogwarts",
            ],
            "launchDate": Any<String>,
            "stops": Any<Array>,
            "title": "Harry Potter on Ice",
          }
        `
      );
    });
  });

  it('gets all tours', () => {
    return Promise.all([postTour(tour), postTour(tourTwo)]).then(() => {
      return request.get('/api/tours').then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            __v: 0,
            _id: expect.any(String),
            launchDate: expect.any(String),
            stops: expect.any(Array)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "activities": Array [
              "Day at Diagon Alley",
              "Quidditch Match",
              "Battle at Hogwarts",
            ],
            "launchDate": Any<String>,
            "stops": Any<Array>,
            "title": "Harry Potter on Ice",
          }
        `
        );
      });
    });
  });
});
