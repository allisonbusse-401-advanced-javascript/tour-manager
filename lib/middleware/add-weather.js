const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  // const { address } = req.body;

  // if(!address) {
  //   return next({
  //     statusCode: 400,
  //     error: 'address is required'
  //   });
  // }

  getForecast(req.body.location.latitude, req.body.location.longitude)
    .then(forecast => {
      
      req.body.weather = forecast[0];
      next();
      
      
    })
    .catch(next);
};