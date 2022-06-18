const model = require("../models/pg-model");

class PgController {
    getPgData(req, res) {
        res.send(model.getPgData());
    }

    getPgDetails(req, res) {
        res.send(model.getPgDetails(req.params.id));
    }

}

module.exports = new PgController();