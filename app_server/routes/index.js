var express = require('express');
var router = express.Router();
var ctrlFacts = require('../controllers/facts');

router.get('/', ctrlFacts.features); // home page aka menu
router.get('/gifs', ctrlFacts.gifs); // gifs
router.get('/usr', ctrlFacts.gifs); // gifs
router.get('/find/tags', ctrlFacts.tags); // find facts by category
router.get('/find/keywords', ctrlFacts.keywords); // find facts by keywords
router.get('/find', ctrlFacts.find); // fact finder menu
router.get('/facts/all', ctrlFacts.allFacts); //view all facts
router.get('/facts/new', ctrlFacts.addFact); //add a new fact; id can be added at the end
router.get('/facts/edit', ctrlFacts.editFact); //edit a specific fact; id will be added at the end
router.get('/facts/view/:factid', ctrlFacts.viewFact); //view a specific fact; id can be added at the end
router.get('/facts/remove/:factid', ctrlFacts.deleteFact); //remove a fact
router.get('/facts/edited', ctrlFacts.editedFact); //confirmation message for when a fact gets edited; id should be added at the end

router.post('/facts/new', ctrlFacts.addFactToDb); //makes an API call to add fact to db
router.post('/facts/keywords', ctrlFacts.keywordsSearch); //makes an API call to fetch facts with specified tags
router.post('/facts/categories', ctrlFacts.categorySearch); //makes an API call to fetch facts with selected categories

module.exports = router;
