// source: https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/

const http = require('http');
let pgData;
const requestListener = function (req, res) {
    console.log("received request!");
    res.end(JSON.stringify(pgData));
}

const server = http.createServer(requestListener);

pgData = requestPlaygroundData();


server.listen(63847);