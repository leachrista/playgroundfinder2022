const { Router } = require('express');
const controller = require('../controllers/pg-controller');
const loginController = require('../controllers/login-controller.js');

const routes = Router(); 

routes.get('/pg-data', controller.getPgData);
routes.get('/playgrounds/:id', controller.getPgDetails);
routes.post('/login',loginController.login);

module.exports = routes;