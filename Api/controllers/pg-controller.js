const model = require("../models/pg-model");

class PgController {
    getPgData(req, res) {
        res.send(model.getPgData());
    }

    getPgDetails(req, res) {
        console.log(req.params);
        res.send(model.getPgDetails(req.params.pgId));
    }

}

module.exports = new PgController();