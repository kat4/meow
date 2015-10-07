// redis functions
var redis = require('redis');
var client = redis.createClient();


// client.hmset('frameworks', {
//     'cookie': 'blahblachblah',
//     'date': 'thedateortime',
//     'body': 'meowmeowmeow'
// });

var redisMeow = (function() {
    function postMeow() {


    }

    function getMeow(cook) {


    }

    function deleteMeow(){


    }

    return {
        postMeow: postMeow,
        getMeow: getMeow,
        deleteMeow: deleteMeow
    };


})();

module.export = redisMeow;
