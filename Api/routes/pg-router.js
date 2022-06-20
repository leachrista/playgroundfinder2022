
const { Router } = require('express');
const controller = require('../controllers/pg-controller');

const routes = Router();

routes.get('/pg-data', controller.getPgData);
routes.get('/playgrounds/:id', controller.getPgDetails);

module.exports = routes;