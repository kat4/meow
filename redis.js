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
            // NEW ADDITIONS
            redisPostObj.key = thisPostIndex;
            client.lpush(['keys', thisPostIndex], function(err, reply) {
                console.log('reply from lpush ..... = ......' + reply);
            });
            client.hmset(thisPostIndex, redisPostObj, function() {
                callback();
            });
        });
    }

    function getMeow(callback) {
        client.get('postcounter', function(err, reply) {
            var multi = client.multi();
            var keysToGet = [];
            client.lrange('keys', 0, 6, function(err, reply) {
                keysToGet = reply;
                keysToGet.forEach(function(thisKey) {
                    multi.hgetall(thisKey);
                });
                multi.exec(function(err, replies) {
                    callback(JSON.stringify(replies));
                });
            });
        });
    }

    function deleteMeow(key, callback) {
        client.lrem('keys', 0, key, function(err, reply) {
            if (err) {
                console.log(err);
            } else {
                client.del(key, function(error, reply) {
                    callback();
                });
            }
        });

    }

    return {
        postMeow: postMeow,
        getMeow: getMeow,
        deleteMeow: deleteMeow,
        client: client
    };


})();


module.exports = redisMeow;
