// redis functions
var redis = require('redis');
var client = redis.createClient();
var redisMeow = (function() {

    function postMeow(postObj, callback) {
        client.incr('postcounter', function(err, reply) {
            if (err) {
                // We created this error handler to find out why redis was hanging.
                // However it is incredibly difficult to test this, so we've commented
                // it out.
                //console.log("ERROR +++++++", err);
            }
            var thisPostIndex = reply;
            var redisPostObj = JSON.parse(postObj);
            client.hmset(thisPostIndex, redisPostObj, function() {
              client.hgetall(thisPostIndex, function(err, object) {
                  console.log('htgetall returning', object);
                  callback();
              });

            });
        });
    }

    function getMeow(callback) {
        client.get('postcounter', function(err, reply) {
            var i = reply;
            client.multi()

            .hgetall(i)
                .hgetall(i - 1)
                .hgetall(i - 2)
                .hgetall(i - 3)
                .hgetall(i - 4)
                .hgetall(i - 5)
                .exec(function(err, replies) {
                    console.log('multi output =    ', replies);
                    callback(JSON.stringify(replies));
                });
        });
    }

    function deleteMeow() {


    }

    return {
        postMeow: postMeow,
        getMeow: getMeow,
        deleteMeow: deleteMeow,
        client: client
    };


})();


module.exports = redisMeow;
