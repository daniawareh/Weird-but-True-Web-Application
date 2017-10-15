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

/*Controller to display all facts*/
module.exports.allFacts = function(req,res){
  res.render('index', {title: 'View All Facts', desc: 'All facts in DB will go here'});
};

/* Controller to add a new fact */
module.exports.addFact = function(req, res){
  res.render('index', {title: 'Add a Fact', desc:'Fact form goes here'});
};

/* Controller to edit a fact */
module.exports.editFact = function(req, res){
  res.render('index', {title: 'Edit Fact', desc: 'Edit fact stuff goes here'});
};

/* Controller to view a fact */
module.exports.viewFact = function(req, res){
  res.render('index', {title: 'View Fact', desc: 'fact + tags here'});
};

/* Controller for fact removed page */
module.exports.removedFact = function(req, res){
  res.render('index', {title: 'Fact Removed', desc: 'fact has been removed message goes here'});
};

/* Controller for fact added page */
module.exports.addedFact = function(req, res){
  res.render('index', {title: 'Fact Added', desc: 'fact has been added message goes here'});
};

/* Controller for fact edited page */
module.exports.editedFact = function (req, res){
  res.render('index', {title: 'Fact Edited', desc: 'fact has been edited message goes here'});
};