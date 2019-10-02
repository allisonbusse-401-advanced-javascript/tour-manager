// eslint-disable-next-line new-cap
const router = require('express').Router();
const Stop = require('../models/stop');
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');
const addForecast = require('../middleware/add-weather');

router
  .post('/:id', addGeo(), addForecast(), (req, res, next) => {
    Stop.create(req.body)
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id, { $push: { stops: stop._id } }, { new: true })
          .then(updatedTour => updatedTour);
      })
      .catch(next);
  });

// .get('/', (req, res, next) => {
//   Tour.find()
//     .then(tours => res.json(tours))
//     .catch(next);
// });

module.exports = router;