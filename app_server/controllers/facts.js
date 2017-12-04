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
    link: '/facts/categories' 
  });
};

/* Controller that makes API call to fetch events by category(s) */
module.exports.categorySearch = function(req, res){
  console.log("req body");
  console.log(req.body);
  var requestOptions, path;
  path = '/api/facts/categories';
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    form: req.body
  };
   request(
    requestOptions,
    function(err, response, body) {
      renderKeySearchFacts(err, req, res, body);
    }
  );
};

/* Controller for fact search */
module.exports.keywords = function(req, res){
  res.render('search-facts', {
    title: 'Fact Search',
    link: '/facts/keywords' 
  });
};

/* Controller that makes API call to fetch facts by keyword(s) */
module.exports.keywordsSearch = function(req, res){
  var requestOptions, path;
  
    path = '/api/facts/tags';
  
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      form: req.body
    };
  
    request(
      requestOptions,
      function(err, response, body) {
        if(err) {
          console.log(err);
          return;
        }
        console.log(body);
        renderKeySearchFacts(err, req, res, body);
      }
    );
};

/* Controller that renders page with facts from keywordsSearch */
var renderKeySearchFacts = function(err, req, res, responseBody){
  var msg;

  if (!Array.isArray(JSON.parse(responseBody))) {
    console.log("API lookup error");
    msg = "API lookup error" + responseBody;
    responseBody = JSON.stringify([]);
  } else {
    if (!JSON.parse(responseBody).length) {
      console.log("no events found");
      msg = "No events match your search";
      responseBody = JSON.stringify([]);
    }
  }

  responseBody = JSON.parse(responseBody);
  res.render('facts-list', {
    title: 'Matching Facts',
    factsList: responseBody,
    link: "/facts/view",
  });
}

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
      confirmationMessage(err, req, res, body);
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
      console.log("view fact body: "+body);

      if(err) {
        console.log("view fact error " +error);
        return;
      }
      
      if(response.statusCode === 404) {
        res.render('error', { 
            message: "Fact not found",
            error: {status: 404}
        }); 
      } else {
        console.log("START: " + body);
        res.render('view-fact', { 
            fact: body.fact,
            tags: body.tags,
            id: body._id
        });
      }
      
    }
  )
};

/* Controller that makes an API call to delete a specific fact */
module.exports.deleteFact = function(req, res){
  var requestOptions, path;
  path = '/api/facts/' + req.params.factid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
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
        console.log("START: " + body);
        removedFact(err, req, res, body);      
    }
  )
};

/* Controller for fact removed page */
removedFact = function(err, req, res, body){
  res.render('message-page', {title: 'Fact Removed', desc: 'Fact has been successfully removed'});
};

/* Controller for fact added page */
confirmationMessage = function(err, req, res, body){
  res.render('message-page', {title: 'Fact Added', desc: 'Fact has been successfully added!'});
};

/* Controller for fact edited page */
module.exports.editedFact = function (req, res){
  res.render('index', {title: 'Fact Edited', desc: 'fact has been edited message goes here'});
};