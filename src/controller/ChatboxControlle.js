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
        // console.log(req.body);
        let searchkey = req.body.searchkey;
        if (searchkey == "") {
            return res.json({
                status: 200,
                message: 'datas',
                result: [],
            });
        }
        // isNaN(searchkey) returns true if string is not number
        // we are here searching by name
        if (isNaN(searchkey)) {
            User.find({ name: { $regex: searchkey, $options: "i" } }, '_id name profile_pic statusbar email', function (errors, result) {
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
        // we are here searching by number
        else {
            User.find({ mobile: { $regex: searchkey } }, '_id name profile_pic statusbar email', function (errors, result) {
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
}
module.exports = ChatboxControlle;
