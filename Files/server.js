// source: https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/

const http = require('http');
let pgData;
const requestListener = function (req, res) {
}

const server = http.createServer(requestListener);

pgData = requestPlaygroundData();

function getPlaygroundData() {
    return pgData;
}

server.listen(63847);