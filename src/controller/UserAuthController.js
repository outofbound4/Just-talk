//init
const bcrypt = require('bcryptjs'); // for password encryption
var User = require('../model/User');

class UserAuthController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
     */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }


    login(req, res) {
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
            let password = req.body.password;
            //finding the user credentials
            User.find({ 'email': email }, "_id mobile name email password statusbar profile_pic", function(errors, result) {
                if (errors) {
                    //sending errors to client page
                    return res.json({
                        status: 500,
                        message: 'data fetching error occurs',
                        errors: errors,
                    });
                }
                // if everything ok
                // checking if user exist with this email or not
                if (Object.keys(result).length !== 0) {
                    let _id = result[0]._id;
                    let mobile = result[0].mobile;
                    let name = result[0].name;
                    let email = result[0].email;
                    let statusbar = result[0].statusbar;
                    let hash = result[0].password;
                    let profile_pic = result[0].profile_pic;
                    // Load hash from your password DB.
                    bcrypt.compare(password, hash, function(err, Authorised) {
                        // console.log(result)
                        if (Authorised === true) {
                            //setting session
                            req.session.mobile = mobile;
                            req.session.name = name;
                            req.session.profile_pic = profile_pic;
                            req.session.email = email;
                            req.session.statusbar = statusbar;
                            req.session._id = _id;
                            //  returning data to user
                            return res.json({
                                status: 200,
                                message: 'Authorised user',
                                // result: result,
                            });
                        } else {
                            //  returning data to user
                            return res.json({
                                status: 422,
                                message: 'Unauthorised user, password incorrect',
                            });
                        }
                    });
                } else {
                    return res.json({
                        status: 421,
                        message: 'email not registered',
                    });
                }
            });
        }
    }

    // logout function here we destoy the session
    logout(req, res) {
        //  returning data to user
        if (req.session.destroy())
            return res.json({
                status: 200,
                message: 'Logout successfull',
            });
    }

    // it verifies the email
    verifyEmail(req, res) {
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
            let _id = req.query._id;
            let emailVerifiactionToken = req.query.token;
            //finding the user credentials
            User.findOne({ '_id': _id }, "emailVerifiactionToken emailVerificationExpiryTime email_verified_at", function(errors, result) {
                if (errors) {
                    //sending errors to client page
                    return res.json({
                        status: 500,
                        message: 'data fetching error occurs',
                        errors: errors,
                    });
                }
                // if everything ok
                let CurrentTime = new Date();
                let timeDifference = CurrentTime - result.emailVerificationExpiryTime;
                if ((result.emailVerifiactionToken.toString() == emailVerifiactionToken) && (result.email_verified_at == null) && (timeDifference < 0)) {

                    result.email_verified_at = CurrentTime;
                    result.save().then(function(result) {
                        // if every things ok
                        // console.log(result);
                        // sends json data to client
                        return res.send("<div class='text-center'><h2 style='color:green;'>Email verification done. Thanks!!</h2></div>");
                    });
                } else {
                    return res.send("<div style='text-center'><h2 style='color:red;'>Link expired. Thanks!!</h2></div>");
                }
            });
        }
    }
}
module.exports = UserAuthController;