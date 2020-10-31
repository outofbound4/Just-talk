//init
var UnreadMessageCount = require('../model/UnreadMessageCount');

class UnreadcCountController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
    */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }

    incUnreadCount(req, res) {
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
            let id_user1 = req.body.id_user1;
            let id_user2 = req.body.id_user2;
            let unread = 0;
            UnreadMessageCount.find({ 'id_user1': id_user1, 'id_user2': id_user2, },
                function (err, result) {
                    // checking if document exists or not
                    if (Object.keys(result).length != 0) {
                        result[0].unreadMessage += 1;
                        unread = result[0].unreadMessage;
                        result[0].save().then(function (result) {
                            //senddind data to client page
                            return res.json({
                                'status': 200,
                                'id_user1': id_user1,
                                'id_user2': id_user2,
                                'unreadMessage': unread,
                                'message': 'Updated successfully',
                            });
                        });
                    }
                    else {
                        // here storing message to unreadmessagecountt document
                        unread = 1;
                        UnreadMessageCount.create({
                            'id_user1': id_user1,
                            'id_user2': id_user2,
                            'unreadMessage': unread,
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
                                    'status': 200,
                                    'id_user1': id_user1,
                                    'id_user2': id_user2,
                                    'unreadMessage': unread,
                                    'message': 'Updated successfully',
                                });
                            });
                    }

                });
        }
    }

    showUnreadCount(req, res) {
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
            let id_user1 = req.body.id_user1;
            UnreadMessageCount.find({ 'id_user1': id_user1, 'unreadMessage': { $ne: 0 } }, "id_user2 unreadMessage",
                function (err, result) {
                    return res.json({
                        'status': 200,
                        'result': result,
                        'message': 'data fetching successful',
                    });
                });
        }
    }

    removeMessageCount(req, res) {
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
            let id_user1 = req.body.id_user1;
            let id_user2 = req.body.id_user2;
            UnreadMessageCount.find({ 'id_user1': id_user1, 'id_user2': id_user2, },
                function (err, result) {
                    // console.log(result);
                    if (Object.keys(result).length != 0) {
                        result[0].unreadMessage = 0;
                        result[0].save().then(function (result) {
                            //senddind data to client page
                            return res.json({
                                'status': 200,
                                'id_user2': id_user2,
                                'message': 'Updated successfully',
                            });
                        });
                    }
                });
        }
    }
}

module.exports = UnreadcCountController;
