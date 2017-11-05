var mongoose = require ('mongoose');

var factSchema = new mongoose.Schema({
    fact: {
        type: String, 
        required: true
    },
    tags: {
        type: [String], 
        required: true
    }
});

mongoose.model('Fact', factSchema, 'facts');