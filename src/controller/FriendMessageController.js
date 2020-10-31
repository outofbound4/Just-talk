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
            let message = req.body.message;
            let id_user1 = req.body.id_user1;
            let id_user2 = req.body.id_user2;
            // here checking if  user2 is present in user1's document or not
            User.find({ '_id': id_user1, 'recent_user.userid': id_user2 }, "recent_user", function (errors, result) {
                // if every things ok
                if (Object.keys(result).length == 0) {
                    // userid is not present then add userid to user.recent_user document
                    User.findOne({ '_id': req.body.id_user1 }, function (errors, result) {
                        // it will insert the data into user.result.recent_user
                        result.recent_user.push({
                            'userid': id_user2,
                            'message': message,
                            'time': new Date(),
                        });
                        result.save().then(function (result) {
                            // console.log("in FriendMessagecontroller : " + result);
                        });
                    });
                }
                else {
                    // here updation user1's recent message so that at the time of
                    // recent user sidebar loading we can use this messge to insert the sidebar
                    for (let i = 0; i < result[0].recent_user.length; i++) {
                        if (result[0].recent_user[i].userid == id_user2) {
                            result[0].recent_user[i].message = message;
                            result[0].recent_user[i].time = new Date();
                            result[0].save().then(function (result) {
                                // console.log("in FriendMessagecontroller : " + result);
                            });
                        }
                    }
                }
            });

            // here checking if  user1 is present in user2's document or not
            User.find({ '_id': id_user2, 'recent_user.userid': id_user1 }, "recent_user", function (errors, result) {
                // if every things ok
                if (Object.keys(result).length == 0) {
                    // userid is not present then add userid to user.recent_user document
                    User.findOne({ '_id': req.body.id_user2 }, function (errors, result) {
                        // it will insert the data into user.result.recent_user
                        result.recent_user.push({
                            'userid': id_user1,
                            'message': message,
                            'time': new Date(),
                        });
                        result.save().then(function (result) {
                            // console.log("in FriendMessageController" + result);
                        });
                    });
                }
                else {
                    // here updation user2's recent message so that at the time of
                    // recent user sidebar loading we can use this messge to insert the sidebar
                    for (let i = 0; i < result[0].recent_user.length; i++) {
                        if (result[0].recent_user[i].userid == id_user1) {
                            result[0].recent_user[i].message = message;
                            result[0].recent_user[i].time = new Date();
                            result[0].save().then(function (result) {
                                // console.log("in FriendMessagecontroller : " + result);
                            });
                        }
                    }
                }
            });
            
            // here storing message to FriendMessage document
            FriendMessage.create({
                id_user1: id_user1,
                id_user2: id_user2,
                message: message,
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

    updateMessageStatus(req, res) {
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
        FriendMessage.updateOne({ '_id': req.body._id },
            {
                '$set': {
                    'status': req.body.status,
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

module.exports = FriendMessageController;
