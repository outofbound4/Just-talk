var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    statusbar: {
        type: String,
        default: "Hey! I'm using just-talk",
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        require: true,
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

    recent_user: [{
        userid: Schema.Types.ObjectId,
        message: String,
        time: {
            type: Date,
            default: Date.now,
        },
    }],

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