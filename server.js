//declaring handler

var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
var index = fs.readFileSync(__dirname + '/public/index.html');
var RedisMeow = require('./redis.js');

var Server = (function() {

    function startServer() {
        http.createServer(handler).listen(port);
    }

    function handler(req, res) {
        var url = req.url;
        var urlArray = url.split('/');
        console.log(urlArray);
        if (req.method === 'GET') {
            if (url === '/') {
                res.end(index);
            } else if (urlArray[1] == 'meows') {
                RedisMeow.getMeow(function(data) {
                    res.end(data);
                });
            } else {
                fs.readFile(__dirname + '/public' + req.url, function(err, file) {
                    if (err) {
                        res.end('arm broken');
                    } else {
                        var ext = req.url.split('.')[1];
                        res.writeHead(200, {
                            'Content-Type': 'text/' + ext
                        });
                    }
                    res.end(file);
                });
            }

        } else if (req.method === 'POST') {
            var body = '';
            req.on('data', function(chunk) {

                body += chunk;
                //what if there are more chunks, you should end the request in the "end" handler
                //console.log("chunk", body);
            });
            //You should send a response anyway in the end handler
            req.on('end', function() {
                //store stuff in a list in redis
                RedisMeow.postMeow(body, function(err, reply) {
                    if (err) {
                        res.end(err);
                    } else {
                        res.writeHead(200);
                        res.end();
                    }
                });

            });

        }
    }
    return {
        startServer: startServer,
        handler: handler
    };
}());


module.exports = Server;
