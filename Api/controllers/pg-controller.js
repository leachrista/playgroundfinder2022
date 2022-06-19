const model = require("../models/pg-model");

class PgController {
    getPgData(req, res) {
        res.send(model.getPgData());
    }

    getPgDetails(req, res) {
        res.send(model.getPgDetails(req.params.id)); //da mach ich ID und dann sollte es spielplatz mit entsprechender ID gehen
    }

}

module.exports = new PgController();