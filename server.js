// source: https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/

const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const pgRouter = require('./api/routes/pg-router');
const {response} = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT ?? 3000;

// Serving static files from folder 'files'
app.use(express.static(path.join(__dirname, 'files')));

app.use(cors());

app.use(cookieParser());

app.use(session({
    secret: 'dsjklfgasdjfk45323fdksjf',
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