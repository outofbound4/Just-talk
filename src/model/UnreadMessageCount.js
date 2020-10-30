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
    
    unreadMessage: {
        type: Number,
        default: 0,
    },
    
});

module.exports = mongoose.model('unread_message_count', schema);