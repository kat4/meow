// redis functions
var redis = require('redis');
var client = redis.createClient();
var redisMeow = (function() {

    function postMeow(postObj, callback) {
        client.incr('postcounter', function(err, reply) {
            if (err) {
                console.log("ERROR +++++++", err);
            }
            var thisPostIndex = reply;
            var redisPostObj = JSON.parse(postObj);
            console.log(redisPostObj, 'index is...........   ', thisPostIndex);
            client.hmset(thisPostIndex, redisPostObj, function() {
                callback();
            });
        });
    }

    function getMeow(callback) {
        client.get('postcounter', function(err, reply) {
            var i = reply;
            console.log('total posts = ', i);
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
