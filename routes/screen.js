var express = require('express');
var router = express.Router();
var rdp = require('node-rdp');

/* GET users listing. */
router.get('/1', function (req, res, next) {
    res.render('screen');
    rdp({
        address: '192.46.208.4:3389',
        username: '',
        password: ''
    }).then(function () {
        console.log('At this, point, the connection has terminated.');
    });
});

router.get('/2', function (req, res, next) {
    res.render('screen');
    rdp({
        address: '192.46.208.4:3389',
        username: '',
        password: ''
    }).then(function () {
        console.log('At this, point, the connection has terminated2.');
    });
});






module.exports = router;
