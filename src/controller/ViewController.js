/**
 * Class ViewController Controller
 */
class ViewController {
  /**
   * Liste of Articles
   * @param {*} req
   * @param {*} res
   */
  home(req, res) {
    return res.render("home");
  }
  userAuth(req, res) {
    return res.render("userAuth");
  }
  chatbox(req, res) {
    // checking if session is set
    // console.log(req.session);
    if (req.session._id) {
      // if session is set then go to next page
      return res.render("chatbox", { session: req.session });
    }
    else {
      // if session not set the goto to login and register page
      return res.render("userAuth");
    }
  }
  forgetPassword(req, res) {
    return res.render("forgetPassword");
  }
  changePassword(req, res) {
    return res.render("changePassword");
  }
  editprofile(req, res) {
    return res.render("editprofile");
  }
  
  inVideoCall(req, res) {
    return res.render("inVideoCall", { data: req.query });
  }
}

module.exports = ViewController;