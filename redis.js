// redis functions
var redis = require('redis');
var client = redis.createClient();

var redisMeow = (function() {

    var pretempPostObj = {
        'cookie': '101021038',
        'date': '2015-10-08',
        'body': 'five'
    };
    // var tempPostObj = JSON.stringify(pretempPostObj);
    function postMeow(postObj) {
        client.incr('postcounter', function(err, reply) {
            var thisPostIndex = reply;
            var redisPostObj = JSON.parse(postObj);
            client.hmset(thisPostIndex, redisPostObj, function() {
                console.log('hmset callback');
            });
            client.hgetall(thisPostIndex, function(err, object) {
                console.log('htgetall returning', object);
            });
        });
    }
    // postMeow(tempPostObj);

    function getMeow(callback) {
        client.get('postcounter', function(err, reply) {
            var i = reply;
            console.log('total posts = ', i);
            //var postIndexArray= [];
            client.multi()

            .hgetall(i)
            .hgetall(i-1)
            .hgetall(i-2)
            .hgetall(i-3)
            .hgetall(i-4)
            .hgetall(i-5)
            .exec(function(err,replies){
                console.log('multi output =    ',replies);
                callback(JSON.stringify(replies));
            });
        });
    }
    //getMeow();

    function deleteMeow() {


    }

    return {
        postMeow: postMeow,
        getMeow: getMeow,
        deleteMeow: deleteMeow
    };


})();


module.exports = redisMeow;
