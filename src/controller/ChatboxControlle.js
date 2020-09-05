//init
var User = require('../model/User');

class ChatboxControlle {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
    */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }


    usersearch(req, res) {
        User.find({ mobile: { $regex: req.body.mobile }}, function (errors, result) {
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
            return res.json({
                status: 200,
                message: 'datas',
                result: result,
            });
        });
    }
}
module.exports = ChatboxControlle;
