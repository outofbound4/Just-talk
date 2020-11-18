//init
var validator = require("email-validator");
var User = require('../model/User');

class UserController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
     */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }

    // it will send userdata by its id
    getUserById(req, res) {
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
                // checking if session is set
                if (req.session._id) {
                    //finding the user credentials
                    User.find({ '_id': req.body.id_user1 }, '_id name profile_pic statusbar email',

                        function(error, result) {
                            if (error) {
                                //sending errors to client page
                                return res.json({
                                    status: 500,
                                    message: 'data fetching error occurs',
                                    error: error,
                                });
                            }
                            // if everything ok
                            //  returning data to user
                            return res.json({
                                status: 200,
                                message: 'Authorised user',
                                result: result[0],
                            });
                        });
                } else {
                    return res.json({
                        status: 'unautherised',
                        message: 'Unauthorised access',
                    });
                }
            }
        }
        // it updates user profile pic
    updateImage(req, res) {
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
            // checking if session is set
            if (req.session._id) {
                // Create a buffer from the string 
                let bufferObj = Buffer.from(req.body.profile_pic, "base64");
                // Encode the Buffer as a utf8 string 
                let decodedImage = bufferObj.toString("utf8");

                User.updateOne({ '_id': req.body._id }, {
                    '$set': {
                        'profile_pic': decodedImage,
                    }
                }, function(err, result) {
                    // adding profile pic to session
                    req.session.profile_pic = decodedImage;
                    // sends json data to client
                    return res.json({
                        status: 200,
                        message: 'Updated successfully',
                        _id: req.body._id,
                    });
                });
            } else {
                return res.json({
                    status: 'unautherised',
                    message: 'Unauthorised access',
                });
            }
        }
    }

    // it updates user profile
    updateProfile(req, res) {
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
            // checking if session is set
            if (req.session._id) {
                // Create a buffer from the string 
                let bufferObj = Buffer.from(req.body.statusbar, "base64");
                // Encode the Buffer as a utf8 string 
                let _id = req.body._id;
                let statusbar = bufferObj.toString("utf8");
                let email = req.body.email;
                let name = req.body.name;
                let mobile = req.body.mobile;
                User.updateOne({ '_id': _id }, {
                    '$set': {
                        'statusbar': statusbar,
                        'name': name,
                    }
                }, function(err, result) {
                    // adding items to session
                    req.session.name = name;
                    req.session.statusbar = statusbar;
                    return res.json({
                        status: 200,
                        message: 'Updated successfully',
                        _id: req.body._id,
                    });
                });
            } else {
                return res.json({
                    status: 'unautherised',
                    message: 'Unauthorised access',
                });
            }
        }
    }

}
module.exports = UserController;