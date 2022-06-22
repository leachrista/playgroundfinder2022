const { Router } = require('express');
const controller = require('../controllers/pg-controller');
const loginController = require('../controllers/login-controller.js');

const routes = Router(); 

routes.get('/pg-data', controller.getPgData);
routes.get('/playgrounds/:pgId', controller.getPgDetails);

routes.post('/reviews/post', controller.postReview); //route for new comment

routes.put('/reviews/edit', controller.editReview);  //route for edit comment

routes.delete('/reviews/delete', controller.deleteReview)  //route for delete comment

routes.post('/login',loginController.login);

module.exports = routes;