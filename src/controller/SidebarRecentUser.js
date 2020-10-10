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

            let sortedArray = result[0].recent_user.sort(function (a, b) {
                return new Date(b.time) - new Date(a.time);
            });
            // Map the result[0].recent_user into an array of just the userid
            var ids = sortedArray.map(function (doc) { return doc.userid; });
            // Get the User whose _id are in that set.
            var data = [];
            var messages = [];
            for (let i = 0; i < ids.length; i++) {
                User.findOne({ '_id': ids[i] }, '_id name profile_pic', function (error, result) {
                    // result contains the user of recent list
                    // here we are inserting the recent message to the result JSON object
                    messages[i] = sortedArray[i].message;
                    data.push(result);
                    // it doesn't send data to untill all the data are fetched
                    if (i == ids.length - 1) {
                        // sending sidebar data to user
                        return res.json({
                            status: 200,
                            message: 'data fetching successful',
                            result: data,
                            messages: messages,
                        });
                    }
                });
            }
        });
    }
}
module.exports = SidebarRecentUser;
