require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController')


var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'pug');

mongoose.connect(config.getDbConnectionString(), config.dbOptions);
setupController(app);
apiController(app);

app.listen(port);