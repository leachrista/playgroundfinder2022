const config = require('../../config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({
            message: "Authentifizierung notwendig"
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userid = decoded.id;
    } catch (err) {
        return res.status(401).send({
            "message": "Token ist ungültig"
        })
    }

    return next();
};

module.exports = verifyToken;