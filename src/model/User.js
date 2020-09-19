var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     lowercase: true,
    // },
    mobile: {
        type: String,
        require: true,
        // index: true,
        unique: true,
        sparse: true,
    },
    profile_pic: {
        type: String,
    },
    email_verified_at: {
        type: Date,
    },
    mobile_verified_at: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
    },

    recent_user: [],

    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    remember_token: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },

});

module.exports = mongoose.model('users', schema);