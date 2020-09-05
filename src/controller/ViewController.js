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
    return res.render("chatbox");
  }
  contactlist(req, res) {
    return res.render("contactlist");
  }
  ownprofile(req, res) {
    return res.render("ownprofile");
  }

  otherprofile(req, res) {
    return res.render("otherprofile");
  }
  editprofile(req, res) {
    return res.render("editprofile");
  }
  
}

module.exports = ViewController;