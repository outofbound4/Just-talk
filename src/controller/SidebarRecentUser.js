//init
var User = require('../model/User');
const { find } = require('../model/User');

class SidebarRecentUser {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
    */
    // this is used to initialize the validator that comes from router.js file
    // validator checks if empty data comes to server
    constructor(validationResult) {
        this.validationResult = validationResult;
    }

    sidebarRecentUser(req, res) {
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

        User.find({ '_id': req.body.id_user1 }, function (error, result) {
            // Map the result[0].recent_user into an array of just the userid
            var ids = result[0].recent_user.map(function (doc) { return doc.userid; });
            // Get the User whose _id are in that set.
            User.find({ '_id': { $in: ids } }, '_id name profile_pic', function (error, result) {
                // result contains your answer
                // console.log(result);
                return res.json({
                    status: 200,
                    message: 'data fetching successful',
                    result: result,
                });
            });
        });
    }
}
module.exports = SidebarRecentUser;
