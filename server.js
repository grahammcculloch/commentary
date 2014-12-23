'use strict';

var express = require('express'),
    path = require('path');

var app = express();

app.engine('html', require('swig').renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/server/views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Live Commentary listening at http://%s:%s', host, port);

});

exports.app = app;