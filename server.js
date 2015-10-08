//declaring handler

var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
var index = fs.readFileSync(__dirname + '/public/index.html');
var redis = require('redis');
var client = redis.createClient();

var Server = (function() {

  function startServer() {
    http.createServer(handler).listen(port);
  }

  function handler(req, res) {
    var url = req.url;
    var urlArray = url.split('/');

    if (req.method === 'GET') {
      if (url === '/') {
        res.end(index);
      }
      else if (urlArray[1] == 'meows') {
        res.end('response');
      }
       else {
         //I recommend you extract this into a separate function
         // called serve_static to make this handler more readable
        fs.readFile(__dirname +'/public' + req.url, function(err, file) {
          if (err) {
            console.log(req.url);
            res.end('arm broken');
          } else {
            var ext = req.url.split('.')[1];
            console.log(req.url + 'get request OK');
            res.writeHead(200, {
              'Content-Type': 'text/' + ext
            });
          }
          res.end(file);
        });
      }

    } else if (req.method === 'POST') {
        console.log('POST running');
        var body = '';
        req.on('data', function(chunk){

          body += chunk;
          //what if there are more chunks, you should end the request in the "end" handler
          console.log("chunk", body);
        });
        //You should send a response anyway in the end handler
        req.on('end', function() {

          //store stuff in a list in redis

          res.end(body);
        });

    }
  }
    return {
      startServer: startServer,
      handler: handler
  };
}());


module.exports = Server;
