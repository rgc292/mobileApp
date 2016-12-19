var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongojs = require('mongojs');

data = require('./data_to_mongo');


db = mongojs('mongodb://localhost:27017/mobile', ['timesheets']);



var index = require('./routes/index');
var timesheets = require('./routes/timesheets');
var alert = require('./routes/alert');

var port = 7004;

var app = express();

// view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Allow cross domain request
app.use(cors());
// client folder
app.use(express.static(path.join(__dirname, 'client')));

// standard middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/timesheets', timesheets);
app.use('/api/alerts', alert);

app.listen(port, function() {
    console.log('Server running on port ' + port);
});
