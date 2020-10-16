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
var ChatboxControlle = require('../src/controller/ChatboxControlle');
const ChatboxControlle_obj = new ChatboxControlle(validationResult);


// View controller router
router.get("/home", (req, res) => Viewcontroller_obj.home(req, res));
router.get("/chatbox", (req, res) => Viewcontroller_obj.chatbox(req, res));
router.get("/contactlist", (req, res) => Viewcontroller_obj.contactlist(req, res));
router.get("/ownprofile", (req, res) => Viewcontroller_obj.ownprofile(req, res));
router.get("/otherprofile", (req, res) => Viewcontroller_obj.otherprofile(req, res));
router.get("/userAuth", (req, res) => Viewcontroller_obj.userAuth(req, res));
router.get("/editprofile", (req, res) => Viewcontroller_obj.editprofile(req, res));
router.get("/inVideoCall", (req, res) => Viewcontroller_obj.inVideoCall(req, res));


// ChatboxControlle router
router.post("/usersearch", (req, res) => ChatboxControlle_obj.usersearch(req, res));

//route for registration or new users
// UserAuthController router
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
//route for getting  user by its id
router.post("/getUserById", [
    check('id_user1', 'id_user1 must not be empty').not().isEmpty(),
], (req, res) => UserAuthController_obj.getUserById(req, res));
// rout for logout
router.post("/logout", (req, res) => UserAuthController_obj.logout(req, res));

//route for store message in FriendMessageController
var FriendMessageController = require('../src/controller/FriendMessageController');
const FriendMessageController_obj = new FriendMessageController(validationResult);
router.post("/storeMessage", [
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
    check('id_user2', 'id_user2 must not be empty').not().isEmpty().trim().escape(),
    check('message', 'message must not be empty').not().isEmpty().trim().escape(),
], (req, res) => FriendMessageController_obj.storeMessage(req, res));
// router for fetching messages
router.post("/fetchMessage", [
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
    check('id_user2', 'id_user2 must not be empty').not().isEmpty().trim().escape(),
], (req, res) => FriendMessageController_obj.fetchMessage(req, res));

//route for fetching sidebar data in SidebarRecentUser
var SidebarRecentUser = require('../src/controller/SidebarRecentUser');
const SidebarRecentUser_obj = new SidebarRecentUser(validationResult);
router.post("/sidebarRecentUser", [
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
], (req, res) => SidebarRecentUser_obj.sidebarRecentUser(req, res));


module.exports = router;