// redis functions
var redis = require('redis');
var client = redis.createClient();

var redisMeow = (function() {

    // var pretempPostObj = {
    //     'cookie': '101021038',
    //     'date': '2015-10-08',
    //     'body': 'five'
    // };
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

    function getMeow() {
        client.get('postcounter', function(err, reply) {
            var totalPosts = reply;
            console.log('total posts = ', totalPosts);
            for (var i = totalPosts; i > 6; i--) {
                //callback(i);
            }
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
