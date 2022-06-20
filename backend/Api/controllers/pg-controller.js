const model = require("../models/pg-model");
const jwt = require('jsonwebtoken');
const config = require('../../config');

class PgController {
    getPgData(req, res) {
        res.send(model.getPgData());
    }

    getPgDetails(req, res) {
        res.send(model.getPgDetails(req.params.id));
    }

    login(req, res) {
        const user = {
            userid: 1,
            username: "testuser",
            password: "testpassword"
        };
        
        const userInput = req.body;
        console.log({req});
        if (userInput.username === user.username && userInput.password === user.password) {
            /* gültige Session zurück geben */
            console.log(config.JWT_SECRET)
            const jwtToken = jwt.sign({
                id: user.userid, //userid ist verboten es geht nur mit id
                username: user.username,
                exp: (Date.now() / 1000) + (60 * 60), //für einen tag den cookie
            }, config.JWT_SECRET);

            res.status(200).send({
               token: jwtToken,
            });
        } else {
            res.status(400).send({message: "Ungültige Anmeldedaten"});
            /* ungültige daten */
        }
    }
    //frontend schickt immer token (Diesen user lassen wir rein den anderen nicht)
    //login nur aufrufen bei gültigem token

}

module.exports = new PgController();