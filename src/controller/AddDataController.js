
var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick coding ass' }];
/**
 * Class ViewController Controller
 */
class AddDataControlll {
  /**
   * Liste of Articles
   * @param {*} req
   * @param {*} res
   */

  todoGET(req, res) {
    data.push(req.query);
    return res.json(req.query);
  }

  todoPOST(req, res) {
    console.log(req);
    data.push(req.body);
    return res.json(req.body);
  }
}
module.exports = AddDataControlll;
