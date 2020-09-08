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
            User.create({
                name: req.body.name,
                mobile: req.body.mobile,
                password: req.body.password,
            },

                function (errors, result) {
                    // iff error occurs
                    if (errors) {
                        //sending errors to client page
                        return res.json({
                            status: 11000,
                            message: 'duplicate key error collection. Mobile number already exist',
                        });
                    }
                    // if every things ok
                    console.log(result);
                    //setting session
                    req.session.mobile = result.mobile;
                    req.session.name = result.name;
                    req.session._id = result._id;
                    //senddind data to client page
                    return res.json({
                        status: 200,
                        message: 'inserted data in user Module',
                        result: result,
                    });
                });
        }
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
            User.find({ mobile: req.body.mobile }, function (errors, result) {
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
                        req.session.mobile = result.mobile;
                        req.session.name = result.name;
                        req.session._id = result._id;

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
                        message: 'mobile number not registered',
                    });
                }
            });
        }
    }
}
module.exports = UserAuthController;
