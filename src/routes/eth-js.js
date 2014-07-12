var mongoose = require('mongoose'),
    winston = require('winston');
var SerpentCode = mongoose.model('SerpentCode');
var exec = require('child_process').exec;


exports.createContract = function (req, res) {
	res.send('OK');
}