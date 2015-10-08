var test = require('tape');
var shot = require('shot');
var Server = require('../server.js');
var RedisMeow = require('../redis.js');

test("check back end test set-up, 1 equals 1", function(t) {
    t.equal(1, 1, "success!");
    t.end();
});
test("Testing endpoint /meows for a reponse of type array", function(t) {
    shot.inject(Server.handler, {
        method: "GET",
        url: '/meows'
    }, function(res) {
        t.equal(Array.isArray(JSON.parse(res.payload)) , true, "success!");
        t.end();
        RedisMeow.client.quit();
    });
});
test("Testing endpoint / for response", function(t) {
    shot.inject(Server.handler, {
        method: "GET",
        url: '/'
    }, function(res) {
        console.log(res.payload.substring(0,15));
        t.equal(res.payload.substring(0,15) , '<!DOCTYPE html>', "...");
        t.end();
        RedisMeow.client.quit();
    });
});
