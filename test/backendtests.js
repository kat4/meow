var test = require('tape');
var shot = require('shot');
var Server = require('../server.js');
var RedisMeow = require('../redis.js');

test("check back end test set-up, 1 equals 1", function(t) {
    t.equal(1, 1, "success!");
    t.end();
});
test("Testing request for frontend.js file", function(t) {
    shot.inject(Server.handler, {
        method: "GET",
        url: '/js/frontend.js'
    }, function(res) {
        t.equal(res.statusCode, 200, "...");
        t.end();
    });
});
test("Testing request for non existant file", function(t) {
    shot.inject(Server.handler, {
        method: "GET",
        url: '/js/kat4writesthebesttests13374204lyfe.js'
    }, function(res) {
        t.equal(res.statusCode, 404, "...");
        t.end();
    });
});
test("Testing endpoint /meows for a reponse of type array", function(t) {
    shot.inject(Server.handler, {
        method: "GET",
        url: '/meows'
    }, function(res) {
        t.equal(Array.isArray(JSON.parse(res.payload)), true, "success!");
        t.end();
    });
});
test("Testing endpoint / for response", function(t) {
    shot.inject(Server.handler, {
        method: "GET",
        url: '/'
    }, function(res) {
        console.log(res.payload.substring(0, 15));
        t.equal(res.payload.substring(0, 15), '<!DOCTYPE html>', "...");
        t.end();
    });
});
test("Testing POST request at /", function(t) {
    shot.inject(Server.handler, {
        method: "POST",
        url: '/',
        payload: JSON.stringify({
            cookie: '101021038',
            date: '2015-10-08',
            body: 'five'
        })
    }, function(res) {
        t.equal(res.statusCode, 200, "...");
        t.end();
        RedisMeow.client.quit();
    });
});
