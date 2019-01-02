var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    mail: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);