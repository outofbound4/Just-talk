/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');


var Viewcontroller = require('../src/controller/ViewController');
const Viewcontroller_obj = new Viewcontroller();
var UserAuthController = require('../src/controller/UserAuthController');
const UserAuthController_obj = new UserAuthController(validationResult);

router.get("/home", (req, res) => Viewcontroller_obj.home(req, res));
router.get("/chatbox", (req, res) => Viewcontroller_obj.chatbox(req, res));
router.get("/contactlist", (req, res) => Viewcontroller_obj.contactlist(req, res));
router.get("/ownprofile", (req, res) => Viewcontroller_obj.ownprofile(req, res));
router.get("/otherprofile", (req, res) => Viewcontroller_obj.otherprofile(req, res));
router.get("/userAuth", (req, res) => Viewcontroller_obj.userAuth(req, res));
router.get("/editprofile", (req, res) => Viewcontroller_obj.editprofile(req, res));

//route for registration og new users
router.post("/register", [
    //check not empty fields
    check('name', 'name must not be empty').not().isEmpty().trim().escape(),
    check('mobile', 'Mobile number should contains 3 digits').isLength({ min: 3 }),
    check('password', 'Password length should be 3 characters').isLength({ min: 3 }),
], (req, res) => UserAuthController_obj.register(req, res));
//route for login of registered user
router.post("/login", [
    check('mobile', 'EmailMobile must not be empty').not().isEmpty().trim().escape(),
    check('password', 'password must not be empty').not().isEmpty(),
], (req, res) => UserAuthController_obj.login(req, res));

module.exports = router;