var mongoose = require("mongoose");
var validator = require('validator');
var Schema = mangoose.Schema;

var schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        },
    },
        mobile: {
            type: String,
            required: true,
            unique: true,
            validate: (value) => {
                return validator.isEmail(value);
            },
        },
            profile_pic: { type: String },
            email_verified_at: { type: Date },
            mobile_verified_at: { type: Date },
            password: { type: String, required: true },
            created_at: { type: Date, default: Date.now  },
            updated_at: { type: Date },
            remember_token: { type: String },
            status: { type: Boolean },

        });

module.exports = mongoose.model('UserModule', schema);