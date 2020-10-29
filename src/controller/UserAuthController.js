//init
var validator = require("email-validator");
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
            //finding the user credentials
            User.find({ 'email': req.body.email }, function (errors, result) {
                if (errors) {
                    //sending errors to client page
                    return res.json({
                        status: 500,
                        message: 'data fetching error occurs',
                        errors: errors,
                    });
                }

                // if everything ok
                // checking password for authenticity
                if (Object.keys(result).length !== 0) { //checking if mobile number is registered
                    if (result[0].password === req.body.password) {
                        //setting session
                        req.session.mobile = result[0].mobile;
                        req.session.name = result[0].name;
                        req.session.profile_pic = result[0].profile_pic;
                        req.session.email = result[0].email;
                        req.session.statusbar = result[0].statusbar;
                        req.session._id = result[0]._id;
                        //  returning data to user
                        return res.json({
                            status: 200,
                            message: 'Authorised user',
                            result: result,
                        });
                    }
                    else {
                        //  returning data to user
                        return res.json({
                            status: 422,
                            message: 'Unauthorised user, password incorrect',
                        });
                    }
                }
                else {
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
            User.findOne({ '_id': _id }, "emailVerifiactionToken emailVerificationExpiryTime email_verified_at", function (errors, result) {
                if (errors) {
                    //sending errors to client page
                    return res.json({
                        status: 500,
                        message: 'data fetching error occurs',
                        errors: errors,
                    });
                }
                // if everything ok
                //  && (result.email_verified_at == 'undefined')
                let CurrentTime = new Date();
                let timeDifference = CurrentTime - result.emailVerificationExpiryTime;
                if ((result.emailVerifiactionToken.toString() == emailVerifiactionToken) && (result.email_verified_at == null) && (timeDifference < 0)) {
                    User.updateOne({ '_id': _id },
                        {
                            '$set': {
                                'email_verified_at': CurrentTime,
                            }
                        }, function (err, result) {
                            console.log(err);
                            console.log(result);
                            // sends json data to client
                            return res.send("<div class='text-center'><h2 style='color:green;'>Email verification done. Thanks!!</h2></div>");
                        });
                }
                else {
                    console.log("emailVerifiactionToken : " + emailVerifiactionToken);
                    console.log("result.emailVerifiactionToken : " + result.emailVerifiactionToken);
                    console.log("result.email_verified_at : " + result.email_verified_at);
                    console.log("timeDifference : " + timeDifference);

                    return res.send("<div style='text-center'><h2 style='color:red;'>Link expired. Thanks!!</h2></div>");
                }
            });
        }
    }
}
module.exports = UserAuthController;
