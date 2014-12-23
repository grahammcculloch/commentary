'use strict';

var request = require('supertest');

var app = require('../../server.js').app;

describe('GET /', function(){
  it('respond with index html', function(done){
    request(app)
    .get('/')
    .expect(200, done);
  });
});
