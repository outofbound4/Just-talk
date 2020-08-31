var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    // _id: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    profile_pic: { type: String },
    email_verified_at: { type: Date },
    mobile_verified_at: { type: Date },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    remember_token: { type: String },
    status: { type: Boolean },

});

module.exports = mongoose.model('users', schema);