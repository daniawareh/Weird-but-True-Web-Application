var express = require('express');
var router = express.Router();
var ctrlFacts = require('../controllers/facts');

router.get('/', ctrlFacts.features); // home page aka menu
router.get('/facts/all', ctrlFacts.allFacts); //view all facts
router.get('/facts/new', ctrlFacts.addFact); //add a new fact; id can be added at the end
router.get('/facts/edit', ctrlFacts.editFact); //edit a specific fact; id will be added at the end
router.get('/facts/view', ctrlFacts.viewFact); //view a specific fact; id can be added at the end
router.get('/facts/removed', ctrlFacts.removedFact); //confirmation message for when a fact gets deleted; id should be added at the end
router.get('/facts/added', ctrlFacts.addedFact); //confirmation message for when a fact gets added; id should be added at the end
router.get('/facts/edited', ctrlFacts.editedFact); //confirmation message for when a fact gets edited; id should be added at the end

module.exports = router;
