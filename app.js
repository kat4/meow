//start server
var http = require('http');
var port = process.env.PORT || 8000;
var Server = require('./server.js');

http.createServer(Server.handler).listen(port);
