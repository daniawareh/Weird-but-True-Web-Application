var mongoose = require('mongoose');
var Fact = mongoose.model('Fact');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.addFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.getAllFacts = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.getFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.editFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.deleteFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};