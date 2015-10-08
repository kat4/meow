//declaring handler

var fs = require('fs');
var index = fs.readFileSync(__dirname + '/public/index.html');
var RedisMeow = require('./redis.js');

var Server = (function() {

    function handler(req, res) {
        var url = req.url;
        var urlArray = url.split('/');
        console.log(urlArray);
        if (req.method === 'GET') {
            if (url === '/') {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(index);
            } else if (urlArray[1] == 'meows') {
                RedisMeow.getMeow(function(data) {
                    res.end(data);
                });
            } else {
                fs.readFile(__dirname + '/public' + req.url, function(err, file) {
                    if (err) {
                        res.writeHead(404);
                        res.end('arm broken');
                    } else {
                        var ext = req.url.split('.')[1];
                        res.writeHead(200, {
                            'Content-Type': 'text/' + ext
                        });
                        res.end(file);
                    }
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

                RedisMeow.postMeow(body, function(){
                    RedisMeow.getMeow(function(data) {
                        res.end(data);
                    });
                });

            });

        } else if (req.method === 'DELETE') {
          console.log("delete request working");

          res.end();
        }



    }
    return {
        handler: handler
    };
}());


module.exports = Server;
