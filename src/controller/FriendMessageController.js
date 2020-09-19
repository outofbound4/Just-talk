//init
var validator = require("email-validator");
var FriendMessage = require('../model/FriendMessage');
var User = require('../model/User');

class FriendMessageController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
    */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }

    storeMessage(req, res) {
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
            // here checking if  user2 is present in user1's document or not
            User.find({ '_id': req.body.id_user1, 'recent_user': { 'userid': req.body.id_user2 } }, function (errors, result) {
                // if every things ok
                if (Object.keys(result).length == 0) {
                    // userid is not present then add userid to user.recent_user document
                    User.findOne({ '_id': req.body.id_user1 }, function (errors, result) {
                        result.recent_user.push({ 'userid': req.body.id_user2 });
                        result.save().then(function (result) {
                            console.log(result);
                        });
                    });
                }
            });
            // here checking if  user1 is present in user2's document or not
            User.find({ '_id': req.body.id_user2, 'recent_user': { 'userid': req.body.id_user1 } }, function (errors, result) {
                // if every things ok
                if (Object.keys(result).length == 0) {
                    // userid is not present then add userid to user.recent_user document
                    User.findOne({ '_id': req.body.id_user2 }, function (errors, result) {
                        result.recent_user.push({ 'userid': req.body.id_user1 });
                        result.save().then(function (result) {
                            console.log(result);
                        });
                    });
                }
            });

            // here storing message to FriendMessage document
            FriendMessage.create({
                id_user1: req.body.id_user1,
                id_user2: req.body.id_user2,
                message: req.body.message,
            },

                function (errors, result) {
                    // iff error occurs
                    if (errors) {
                        //sending errors to client page
                        return res.json({
                            status: 11000,
                            message: 'Error in storing data',
                        });
                    }
                    // console.log(result);
                    // if every things ok
                    //senddind data to client page
                    return res.json({
                        status: 200,
                        message: 'inserted data in user Friends_message',
                        result: result,
                    });
                });
        }
    }

    fetchMessage(req, res) {
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
            FriendMessage.find({
                $or: [{
                    'id_user1': req.body.id_user2,
                    'id_user2': req.body.id_user1,
                },
                {
                    'id_user1': req.body.id_user1,
                    'id_user2': req.body.id_user2,
                }],
            },

                function (errors, result) {
                    // iff error occurs
                    if (errors) {
                        //sending errors to client pag
                        return res.json({
                            status: 11000,
                            message: 'Error in fetching data',
                        });
                    }
                    // if every things ok
                    //senddind data to client page
                    return res.json({
                        status: 200,
                        message: 'data fetching successful',
                        result: result,
                    });
                });
        }
    }

}

module.exports = FriendMessageController;
