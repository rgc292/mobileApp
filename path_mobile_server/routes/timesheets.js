var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/mobile', ['timesheets']);

// Get all timesheets
router.get('/timesheets', function(req, res, next) {
    db.timesheets.find(function(err, timesheets) {
        if (err) {
            res.send(err);
        }
        res.json(timesheets);
    });
});

// Get single timesheet
router.get('/timesheets/:id', function(req, res, next) {
    db.timesheets.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, timesheet) {
        if (err) {
            res.send(err);
        }
        res.json(timesheet);
    });
});

module.exports = router;
