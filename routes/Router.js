/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();


var Viewcontroller = require('../src/controller/ViewController');
const  Viewcontroller_obj= new Viewcontroller();
var UserAuthController = require('../src/controller/UserAuthController');
const UserAuthController_obj = new UserAuthController();

router.get("/home", (req, res) => Viewcontroller_obj.home(req, res));
router.get("/userAuth", (req, res) => Viewcontroller_obj.userAuth(req, res));
router.post("/register", (req, res) => UserAuthController_obj.register(req, res));
router.post("/login", (req, res) => UserAuthController_obj.login(req, res));

module.exports = router;