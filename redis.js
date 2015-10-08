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
            redisPostObj.key = thisPostIndex;
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
            //var i = reply;
            var multi = client.multi();
            for(var j=reply; j>reply-6 ; j-- ){
                client.hgetall(j, function(err,reply){
                    console.log('DOES J HAVE ANYTHING INSIDE???',reply);
                    // if reply == null, move on to next j?????
                });
                multi.hgetall(j);
            }
            // .hgetall(i)
            //     .hgetall(i - 1)
            //     .hgetall(i - 2)
            //     .hgetall(i - 3)
            //     .hgetall(i - 4)
            //     .hgetall(i - 5)
                multi.exec(function(err, replies) {
                    console.log('multi output =    ', replies);
                    callback(JSON.stringify(replies));
                });
        });
    }

    function deleteMeow(key, callback) {
        client.del(key, function(error, reply) {
            console.log(reply);
                callback();
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
