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
            //finding the user credentials
            User.find({ '_id': req.body.id_user1 }, '_id name profile_pic statusbar email',

                function (error, result) {
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

            // Create a buffer from the string 
            let bufferObj = Buffer.from(req.body.profile_pic, "base64");
            // Encode the Buffer as a utf8 string 
            let decodedImage = bufferObj.toString("utf8");

            User.updateOne({ '_id': req.body._id },
                {
                    '$set': {
                        'profile_pic': decodedImage,
                    }
                }, function (err, result) {
                    return res.json({
                        status: 200,
                        message: 'Updated successfully',
                        _id: req.body._id,
                    });
                });
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
            // Create a buffer from the string 
            let bufferObj = Buffer.from(req.body.statusbar, "base64");
            // Encode the Buffer as a utf8 string 
            let statusbar = bufferObj.toString("utf8");

            User.updateOne({ '_id': req.body._id },
                {
                    '$set': {
                        'statusbar': statusbar,
                        'name': req.body.name,
                        'email': req.body.email,
                        'mobile': req.body.mobile,
                    }
                }, function (err, result) {
                    return res.json({
                        status: 200,
                        message: 'Updated successfully',
                        _id: req.body._id,
                    });
                });
        }
    }

}
module.exports = UserController;