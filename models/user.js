var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: {type: String, required: true, max: 15},
    sex: {type: String, required: true, max: 1},
    phone_number: {type: String, required: true, max: 9},
    avatar: {type: String}
});


// Export the model
module.exports = mongoose.model('Customer', CustomerSchema, 'customer');