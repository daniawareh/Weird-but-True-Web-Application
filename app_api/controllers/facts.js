var mongoose = require('mongoose');
var Fact = mongoose.model('Fact');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* Add a new fact to database. */
module.exports.addFact = function (req, res) { 
    if (req.body && req.body.tags && req.body.fact){
        console.log(req.body);
        var tags = req.body.tags.split(",");
        
        Fact.create({
            fact: req.body.fact,
            tags: tags,
        }, function(err, fact) {
          if(err) {
            sendJsonResponse(res, 400, error);
          } else {
            sendJsonResponse(res, 201, fact);
          }
        });
    }
    else {
        sendJsonResponse(res, 404, {"message" : "All fields required"});
    }
};

/* Get all facts from database. */
module.exports.getAllFacts = function (req, res) {
    Fact.find({}, 
        function(err, facts) {
            sendJsonResponse(res, 200, facts);
        }
    );
};

/*Get one random fact from database */
module.exports.randomFact = function(req, res){
    console.log("random fact api controller");
    Fact.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        console.log("random "+random);
        Fact.findOne().skip(random).exec(
            function(err, result){
                sendJsonResponse(res, 200, result);
            }
        );
    });
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
    if (req.params && req.params.factid){
        //do stuff!
    }
    else {
        sendJsonResponse(res, 404, {"message": "No factid in request"});
    }
};

/* Delete specific fact from database. */
module.exports.deleteFact = function (req, res) { 
    if (req.params && req.params.factid){
        var factid = req.params.factid;
        if(factid) {
          Fact
          .findByIdAndRemove(factid)
          .exec(
            function(err, fact) {
              if(err) {
                // Respond with failure
                sendJsonResponse(res, 404, err);
                return;
              }
              // Respond with success
              sendJsonResponse(res, 204, null);
            }
          )
        } else {
            // Respond with failure
            sendJsonResponse(res, 404, {
              "message": "No valid factid provided"
            });
        }
    }
    else {
        sendJsonResponse(res, 404, {"message": "No factid in request"});
    }
};