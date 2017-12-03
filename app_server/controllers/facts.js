var request = require('request');

var apiOptions = {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://weird-but-true.herokuapp.com";
}

/* Controller for home/landing/menu page */
module.exports.features = function(req, res){
  res.render('index', {title: 'Main Menu'});
};

/* Controller for gif page */
module.exports.gifs = function(req, res){
  res.render('gifs', {title: 'App Screenshots'});
};

/* Controller for fact finder menu */
module.exports.find = function(req, res){
  res.render('find', {title: 'Fact Finder'});
};

/* Controller for fact filter */
module.exports.tags = function(req, res){
  res.render('filter-facts', {
    title: 'Fact Filter',
    link: '#' 
  });
};

/* Controller for fact search */
module.exports.keywords = function(req, res){
  res.render('search-facts', {
    title: 'Fact Search',
    link: '#' 
  });
};

/*Controller that makes API call to display all facts*/
module.exports.allFacts = function(req,res){
  var requestOptions, path;
  
    path = '/api/facts';
  
    requestOptions = {
      url: apiOptions.server + path,
      method: "GET",
      json: {},
      qs: {}
    };
  
    request(
      requestOptions,
      function(err, response, body) {
        renderAllFactsPage(err, req, res, body);
      }
    );
};

/* Renders event list with all facts fetched from API */
var renderAllFactsPage = function(err, req, res, responseBody) {
  console.log(responseBody);
  if(!(responseBody instanceof Array)) {
    message = "API lookup error" + responseBody;
    responseBody = [];
  } else {
      if(!responseBody.length) {
        message = "No facts found";
      }
  }
  res.render('facts-list', {
    title: 'All Facts',
    factsList: responseBody,
    link: "/facts/view",
});
}

/* Controller to add a new fact */
module.exports.addFact = function(req, res){
  res.render('add-fact', {title: 'Add a Fact', desc:'Add a fact by entering the fact and related tags.'});
};

/* Makes API call to add a fact to the DB */
module.exports.addFactToDb = function(req, res){
  console.log(req.body); 
  var requestOptions, path;
  path = '/api/facts';

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    form: req.body
  };

  request(
    requestOptions,
    function(err, response, body) {
      addedFact(err, req, res, body);
    }
  );
};

/* Controller to edit a fact */
module.exports.editFact = function(req, res){
  res.render('index', {title: 'Edit Fact', desc: 'Edit fact stuff goes here'});
};

/* Controller to view a fact */
module.exports.viewFact = function(req, res){
  var requestOptions, path;
  path = '/api/facts/' + req.params.factid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      console.log(body);

      if(err) {
        console.log(error);
        return;
      }
      
      if(body.msg === "factid not found") {
        res.render('error', { 
            message: "Event not found"
        }); 
      } else {
        console.log("START: " + body.start);
        res.render('view-fact', { 
            fact: body.fact,
            tags: body.tags
        });
      }
      
    }
  )
};

/* Controller for fact removed page */
module.exports.removedFact = function(req, res){
  res.render('index', {title: 'Fact Removed', desc: 'fact has been removed message goes here'});
};

/* Controller for fact added page */
addedFact = function(err, req, res, body){
  res.render('added-fact', {title: 'Fact Added', desc: 'fact has been added message goes here'});
};

/* Controller for fact edited page */
module.exports.editedFact = function (req, res){
  res.render('index', {title: 'Fact Edited', desc: 'fact has been edited message goes here'});
};