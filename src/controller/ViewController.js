/**
 * Class ViewController Controller
 */
class ViewController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
     */
    
    userAuth(req, res) {
        return res.render("userAuth");
    }
    
    chatbox(req, res) {
        // checking if session is set
        if (req.session._id) {
            // if session is set then go to next page
            return res.render("chatbox", { session: req.session });
        } else {
            // if session not set the goto to login and register page
            return res.render("userAuth");
        }
    }
    forgetPassword(req, res) {
        return res.render("forgetPassword");
    }
    changePassword(req, res) {
        return res.render("changePassword", { data: req.query });
    }
    editprofile(req, res) {
        // checking if session is set
        if (req.session._id) {
            // if session is set then go to next page
            return res.render("editprofile");
        } else {
            // if session not set the goto to login and register page
            return res.render("userAuth");
        }
    }

    inVideoCall(req, res) {
        // checking if session is set
        if (req.session._id) {
            // if session is set then go to next page
            return res.render("inVideoCall", { data: req.query });
        } else {
            // if session not set the goto to login and register page
            return res.render("userAuth");
        }
        
    }
}

module.exports = ViewController;