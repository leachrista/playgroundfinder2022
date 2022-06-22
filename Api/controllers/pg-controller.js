const model = require("../models/pg-model");

class PgController {
    getPgData(req, res) {
        res.send(model.getPgData());
    }

    getPgDetails(req, res) {
        console.log("pg details request at controller with: " + req.params);
        res.send(model.getPgDetails(req.params.pgId));
    }

    postReview(req, res) {
        console.log("post review request at controller with: " + req.params);
        res.send(model.postReview(req, res));
    }

    editReview(req, res) {
        console.log("edit review request at controller with: " + req.params);
        res.send(model.editReview(req, res));
    }
/*
der Controller leitet es weiter an die zugehörige Methode im Model.
 */
    deleteReview(req, res) {
        console.log("delete review request at controller with: " + req.params);
        res.send(model.deleteReview(req, res));
        /*
        in dem (req.) ist der body drinnen. user Lea pg ID 2 review 2-1., nichts ist gelöscht
         */
    }
}

module.exports = new PgController();