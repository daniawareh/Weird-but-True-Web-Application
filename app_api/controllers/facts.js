var mongoose = require('mongoose');
var Fact = mongoose.model('Fact');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* Add a new fact to database. */
module.exports.addFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

/* Get all facts from database. */
module.exports.getAllFacts = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

/* Get a specific fact from database. */
module.exports.getFact = function (req, res) {
    if (req.params && req.params.factid){
        Fact.findById(req.params.factid).exec(
            function(err, fact) {
                if (!fact){
                    sendJsonResponse(res, 404, {"message":"factid not found"});
                    return;
                }
                else if (err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, fact); 
            }
        );
    }
    else {
        sendJsonResponse(res, 404, {"message": "No factid in request"});
    }
};

/* Edit a specific fact. */
module.exports.editFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};

/* Delete specific fact from database. */
module.exports.deleteFact = function (req, res) { 
    sendJsonResponse(res, 200, {"status" : "success"});
};