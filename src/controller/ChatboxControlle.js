//init
var User = require('../model/User');

// it validates email
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

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
        // checking if session is set
        if (req.session._id) {
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
            if (!isEmail(searchkey)) {
                User.find({ name: { $regex: searchkey, $options: "i" } }, '_id name profile_pic statusbar email', function(errors, result) {
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
            // we are here searching by email
            else {
                User.find({ email: { $regex: searchkey } }, '_id name profile_pic statusbar email', function(errors, result) {
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
        } else {
            return res.json({
                status: 'unautherised',
                message: 'Unauthorised access',
            });
        }
    }
}
module.exports = ChatboxControlle;