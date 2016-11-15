var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var timesheets = require('./routes/timesheets');

var port = 7004;

var app = express();

// view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// client folder
app.use(express.static(path.join(__dirname, 'client')));

// standard middleware body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', timesheets);

app.listen(port, function() {
    console.log('Server running on port ' + port);
});

