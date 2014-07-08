var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SerpentSchema = new Schema({
    code: String,
    bytecode: String
});

mongoose.model('SerpentCode', SerpentSchema);

var mongoUri = process.env.MONGOLAB_URI ||
    'mongodb://localhost/ethkit';

//mongoose.connect(mongoUri);