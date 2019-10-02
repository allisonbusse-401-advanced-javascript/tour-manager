# tour-manager
This lab sets up a tour and stop model. The tour model incorporates the stop model via its ID. I wrote routes for posting a tour and getting all tours, and for posting, deleting, and updating a stop. 

[Pull Request](https://github.com/allisonbusse-401-advanced-javascript/tour-manager/pull/1)

## Scripts
  * "lint": "eslint .",
  * "pretest": "npm run lint",
  * "jest": "jest --runInBand",
  * "test": "npm run jest",
  * "test:coverage": "npm run test -- --coverage",
  * "test:watch": "npm run jest -- --watchAll",
  * "test:verbose": "npm run test -- --verbose",
  * "start": "node server.js",
  * "start:watch": "nodemon server.js"