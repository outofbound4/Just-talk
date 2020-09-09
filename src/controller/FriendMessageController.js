//init
var validator = require("email-validator");
var FriendMessage = require('../model/FriendMessage');

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

}

module.exports = FriendMessageController;
