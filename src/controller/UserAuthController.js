
/**
 * Class ViewController Controller
 */
class UserAuthController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
     */

    register(req, res) {
        // data.push(req.query);
        // return res.json(req.query);
        console.log(req.body);
    }

    login(req, res) {
        // console.log(req);
        // data.push(req.body);
        // return res.json(req.body);
        console.log(req.body);
    }
}

module.exports = UserAuthController;
