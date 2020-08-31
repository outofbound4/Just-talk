var User = require('../model/User');
/**
 * Class ViewController Controller
 */
class UserAuthController {
    /**
     * Liste of Articles
     * @param {*} req
     * @param {*} res
    */
    constructor(validationResult) {
        this.validationResult = validationResult;
    }

    register(req, res) {
        let errors = this.validationResult(req);
        /* If some error occurs, then this 
         *  block of code will run 
         */
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.json(errors);
        }
        /* If no error occurs, then this 
         * block of code will run 
         */
        else {
            User.create({
                name: req.body.name,
                mobile: req.body.mobile,
                password: req.body.password,
            },
            
            function (error, result) {
                // iff error occurs
                if (error) {
                    console.log(error);
                    return res.json({
                        status: false,
                        message: 'Error in inserting data in user Module',
                        error: error
                    });
                }
                // if every things ok
                console.log(result);
                return res.json({
                    status: true,
                    message: 'inserted data in user Module',
                    result: result
                });
            });
        }
    }

    login(req, res) {
        let errors = this.validationResult(req);
        /* If some error occurs, then this 
         *  block of code will run 
         */
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.json(errors);
        }
        /* If no error occurs, then this 
        * block of code will run 
        */
        else {
            res.send("Successfully validated");
            console.log(req.body);
        }
    }
}

module.exports = UserAuthController;
