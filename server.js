// source: https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/

//Server ist das Herzstück des Backend. Über diesen Server läuft.
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const pgRouter = require('./api/routes/pg-router'); //Routes für die Anfragen gespeichert wo zum Backend gehen

//const cors = require("cors");

const app = express();
const port = process.env.PORT ?? 3000;

// Serving static files from folder 'files'
app.use(express.static(path.join(__dirname, 'files')));
/*
cors is
 */
//app.use(cors());


/*
parse cookie header and populate req.cookies with an object keyed by the cookie names.
 */
app.use(cookieParser());


//session middleware with the given options is implemented with app.use.session
app.use(session({ //session für die sessionverwaltung. durch login erstellen wir eine session.
    secret: 'dsjklfgasdjfk45323fdksjf', //passwort mit dem es verschlüsselt wird ?
    resave: false,
    saveUninitialized: true
}))

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());

// Include the pg routes
app.use('/api', pgRouter);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});