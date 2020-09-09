var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    
    id_user1: {
        type: String,
        require: true,
    },
    id_user2: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('friends_messages', schema);