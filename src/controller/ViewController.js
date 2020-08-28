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
}

module.exports = ViewController;