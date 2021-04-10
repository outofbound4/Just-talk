const nodemailer = require('nodemailer'); // for sending mail to user
const bcrypt = require('bcryptjs'); // for password encryption
var User = require('../model/User');
require('dotenv').config();

/**
 * initializing nodemailer for sending mail
 * to users
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});
// this function will generate randome alfa numeric string
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
// it sends the mail to user
function sendMailToUser(from, to, subject, text, res) {
    var mailOptions = {
        'from': from,
        'to': to,
        'subject': subject,
        'text': text,
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            //sending errors to client page
            console.log(JSON.stringify(error));
            return res.json({
                'status': false,
                'message': "535-5.7.8 Username and Password not accepted."
            });

        } else {
            //sending errors to client page
            return res.json({
                'status': true,
                'message': info.response,
            });
        }
    });
}

// mail sender controller
class NodeMailer {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
     */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }
    register(req, res) {
        let errors = this.validationResult(req);
        /* If some error occurs, then this 
         *  block of code will run 
         */
        if (!errors.isEmpty()) {
            //sending errors to client page
            return res.json({
                status: 400,
                message: 'Required Param Empty',
                errors: errors,
            });
        }
        /* If no error occurs, then this 
         * block of code will run 
         */
        else {
            let email = req.body.email;
            let name = req.body.name;
            let password = req.body.password;
            //finding the user credentials
            User.find({ email: email }, "_id name email password emailVerifiactionToken emailVerificationExpiryTime email_verified_at", function(errors, result) {
                if (errors) {
                    //sending errors to client page
                    return res.json({
                        status: 500,
                        message: 'data fetching error occurs',
                        errors: errors,
                    });
                }
                // if everything ok
                //checking if result exists
                if (Object.keys(result).length !== 0) {
                    if (result[0].email_verified_at == null) {
                    // if (result[0].email_verified_at == undefined) {
                        // generating email authentication tocken
                        let verificationToken = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        // adding 30 minutes to current time
                        var now = new Date();
                        now.setMinutes(now.getMinutes() + 30); // timestamp
                        let emailVerificationExpiryTime = new Date(now); // Date object
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(password, salt, function(err, hash) {
                                // updating the document that is not verified
                                result[0].name = name;
                                result[0].email = email;
                                result[0].password = hash;
                                result[0].emailVerifiactionToken = verificationToken;
                                result[0].emailVerificationExpiryTime = emailVerificationExpiryTime;

                                result[0].save().then(function(result) {
                                    // if every things ok
                                    let _id = result._id;
                                    let from = process.env.ADMIN_EMAIL;
                                    let to = email;
                                    let subject = "Just-Talk Email verification Link";
                                    let text = "http://localhost:3000/verifyEmail?_id=" + _id + "&token=" + verificationToken;
                                    // here we are calling sendMailToUser function
                                    sendMailToUser(from, to, subject, text, res);
                                }).catch(function(err) {
                                    return res.json({
                                        status: 'error',
                                        error: err,
                                    });
                                });
                            });
                        });
                    } else {
                        return res.json({
                            status: 'userExist',
                            message: 'Email id already exist',
                        });
                    }
                } else {
                    // generating email authentication tocken
                    let verificationToken = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                    // adding 30 minutes to current time
                    var now = new Date();
                    now.setMinutes(now.getMinutes() + 30); // timestamp
                    let emailVerificationExpiryTime = new Date(now); // Date object

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                            // creating document here
                            User.create({
                                    'name': name,
                                    'email': email,
                                    'password': hash,
                                    'emailVerifiactionToken': verificationToken,
                                    'emailVerificationExpiryTime': emailVerificationExpiryTime,
                                },

                                function(errors, result) {
                                    let _id = result._id;
                                    // iff error occurs
                                    if (errors) {
                                        //sending errors to client page
                                        return res.json({
                                            status: 11000,
                                            message: 'duplicate key error collection. Mobile number already exist',
                                        });
                                    }
                                    // if every things ok
                                    // console.log(result);
                                    // if every things ok
                                    let from = process.env.ADMIN_EMAIL;
                                    let to = email;
                                    let subject = "Just-Talk Email verification";
                                    let text = "http://localhost:3000/verifyEmail?_id=" + _id + "&token=" + verificationToken;
                                    sendMailToUser(from, to, subject, text, res);
                                });
                        });
                    });
                }
            });
        }
    }

    // it sends the forget password reset link to user
    forgotPassword(req, res) {
        let errors = this.validationResult(req);
        /* If some error occurs, then this 
         *  block of code will run 
         */
        if (!errors.isEmpty()) {
            //sending errors to client page
            return res.json({
                status: 400,
                message: 'Required Param Empty',
                errors: errors,
            });
        }
        /* If no error occurs, then this 
         * block of code will run 
         */
        else {
            let email = req.body.email;
            // finding the user credentials
            User.find({ email: email }, "_id", function(errors, result) {
                if (errors) {
                    //sending errors to client page
                    return res.json({
                        status: 500,
                        message: 'data fetching error occurs',
                        errors: errors,
                    });
                }
                // console.log(result)
                // if everything ok
                //checking if result exists
                if (Object.keys(result).length !== 0) {
                    let _id = result[0]._id;
                    // generating email authentication tocken
                    let passwordResetToken = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                    // adding 30 minutes to current time
                    var now = new Date();
                    now.setMinutes(now.getMinutes() + 30); // timestamp
                    let PasswordResetExpiryTime = new Date(now); // Date object

                    result[0].passwordResetToken = passwordResetToken;
                    result[0].PasswordResetExpiryTime = PasswordResetExpiryTime;
                    result[0].PasswordResetStatus = false;
                    result[0].save().then(function(result) {
                        // if every things ok
                        let from = process.env.ADMIN_EMAIL;
                        let to = email;
                        let subject = "Just-Talk Password Reset";
                        let text = "http://localhost:3000/changePassword?_id=" + _id + "&token=" + passwordResetToken;
                        // here we are calling sendMailToUser function
                        sendMailToUser(from, to, subject, text, res);
                    });
                } else {
                    return res.json({
                        status: 'emailNotRegistered',
                        message: 'this email is not registered email.',
                    });
                }
            });
        }
    }
}

module.exports = NodeMailer;