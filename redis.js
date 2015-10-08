// redis functions
var redis = require('redis');
var client = redis.createClient();

// client.set('key1', 10, function() {
//   client.incr('key1', function(err, reply) {
//     console.log(reply); // 11
//   });
// });
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
client.hgetall('frameworks', function(err, object) {
    console.log(object);
});
var redisMeow = (function() {

  function postMeow() {
    console.log('postmeow');


  }


  function getMeow() {
    console.log('hi');
    client.hgetall('meows', 0, -1, function(err, reply) {
      if (err) {
        console.log('nothing found...');
      } else {
        var list = reply.toString();
        console.log(reply);
        response.end('test' + list);
      }
    });

  }

  function deleteMeow() {


  }

  return {
    postMeow: postMeow,
    getMeow: getMeow,
    deleteMeow: deleteMeow
  };


})();


module.exports = redisMeow;
