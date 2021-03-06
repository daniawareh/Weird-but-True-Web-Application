var express = require('express');
var router = express.Router();
var ctrlFacts = require('../controllers/facts');

router.get('/facts', ctrlFacts.getAllFacts); //fetch a list of all facts
router.get('/facts/:factid', ctrlFacts.getFact); //fetch a specific fact
router.get('/fact/random', ctrlFacts.randomFact); //fetch a specific fact

router.post('/facts', ctrlFacts.addFact); //create a new fact
router.post('/facts/tags', ctrlFacts.tagsSearch); //tag based search
router.post('/facts/categories', ctrlFacts.categorySearch); //search based on categories

router.put('/facts/:factid', ctrlFacts.editFact); //update a specific fact

router.delete('/facts/:factid', ctrlFacts.deleteFact);  //delete a specific fact

module.exports = router;