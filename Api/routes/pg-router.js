const { Router } = require('express');
const pgController = require('../controllers/pg-controller');
const loginController = require('../controllers/login-controller.js');

const routes = Router();
/*
hier sind die Routes aufgelistet.
Unsere Server "verwendet" die.
 */

routes.get('/pg-data', pgController.getPgData);
routes.get('/playgrounds/:pgId', pgController.getPgDetails);

routes.post('/reviews/post', pgController.postReview); //route for new comment

routes.put('/reviews/edit', pgController.editReview);  //route for edit comment

routes.delete('/reviews/delete', pgController.deleteReview)  //route for delete comment
//man landet hier wenn delete geklickt wurde. ->ondeltebuttonclick->deletereview funktion --> erstellt objekt mit daten die router empfängt
//--> man landet hier nachdem fetchmethode ausgeführt wird

routes.post('/login',loginController.login);

module.exports = routes;