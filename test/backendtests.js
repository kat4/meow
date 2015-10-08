var test = require('tape');
var shot = require('shot');
var serverFile = require('../server.js');

test("check back end test set-up, 1 equals 1", function(t) {
  t.equal(1, 1, "success!");
  t.end();
});
