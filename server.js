//declaring handler

var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
var index = fs.readFileSync(__dirname + '/public/index.html');
// var redis = require('redis');
// var client = redis.createClient();

var Server = (function() {

  function startServer() {
    http.createServer(handler).listen(port);
  }

  function handler(req, res) {
    var url = req.url;
    var urlArray = url.split('/');

    if (req.method === 'GET') {
      if (urlArray.length == 2) {
        res.end(index);
      }
      else if (urlArray[1] == 'meows') {
        console.log('hello' + urlArray);
        res.end('response');
      }
       else {
        fs.readFile(__dirname +'/public' + req.url, function(err, file) {
          if (err) {
            console.log(req.url);
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

    }
  }
    return {
      startServer: startServer,
      handler: handler
  };
}());


module.exports = Server;
