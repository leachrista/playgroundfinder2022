const { Router } = require('express');
const controller = require('../controllers/pg-controller');
const authMiddleware = require('../middleware/auth-middleware');

const routes = Router();

routes.get('/pg-data', authMiddleware, controller.getPgData);
routes.get('/playgrounds/:id', controller.getPgDetails);
routes.post('/login', controller.login);

module.exports = routes;