var data = [{item : 'get milk'}, {item : 'walk dog'}, {item : 'kick coding ass'}];
/**
 * Class ViewController Controller
 */
class ViewController {
  /**
   * Liste of Articles
   * @param {*} req
   * @param {*} res
   */
  todo(req, res) {
    return res.render('todo', {todos : data});
  }
  home(req, res) {
    return res.render("home");
  }
}

module.exports = ViewController;