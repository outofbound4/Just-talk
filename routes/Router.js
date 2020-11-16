/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const validator = require('validator')


var Viewcontroller = require('../src/controller/ViewController');
const Viewcontroller_obj = new Viewcontroller();
var UserAuthController = require('../src/controller/UserAuthController');
const UserAuthController_obj = new UserAuthController(validationResult);
var ChatboxControlle = require('../src/controller/ChatboxControlle');
const ChatboxControlle_obj = new ChatboxControlle(validationResult);


// View controller router
router.get("/chatbox", (req, res) => Viewcontroller_obj.chatbox(req, res));
router.get("/forgetPassword", (req, res) => Viewcontroller_obj.forgetPassword(req, res));
router.get("/changePassword", (req, res) => Viewcontroller_obj.changePassword(req, res));
router.get("/userAuth", (req, res) => Viewcontroller_obj.userAuth(req, res));
router.get("/editprofile", (req, res) => Viewcontroller_obj.editprofile(req, res));
router.get("/inVideoCall", (req, res) => Viewcontroller_obj.inVideoCall(req, res));


// ChatboxControlle router
router.post("/usersearch", (req, res) => ChatboxControlle_obj.usersearch(req, res));

//route for login of registered user
router.post("/login", [
    check('email', 'email must not be empty').not().isEmpty().trim().escape(),
    check('password', 'password must not be empty').not().isEmpty(),
], (req, res) => UserAuthController_obj.login(req, res));
// route for verify email address
router.get("/verifyEmail", [
    check('_id', '_id must not be empty').not().isEmpty().trim().escape(),
    check('token', 'token must not be empty').not().isEmpty().trim().escape(),
], (req, res) => UserAuthController_obj.verifyEmail(req, res));
// route for change password
router.post("/saveChangedPassword", [
    check('_id', '_id must not be empty').not().isEmpty().trim().escape(),
    check('token', 'token must not be empty').not().isEmpty().trim().escape(),
    check('password', 'password must not be empty').not().isEmpty().trim(),
], (req, res) => UserAuthController_obj.saveChangedPassword(req, res));
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
// router for update read, delivery message status
router.post("/updateMessageStatus", [
    check('_id', '_id must not be empty').not().isEmpty().trim().escape(),
    check('status', 'status must not be empty').not().isEmpty().trim().escape(),
], (req, res) => FriendMessageController_obj.updateMessageStatus(req, res));

//route for fetching sidebar data in SidebarRecentUser
var SidebarRecentUser = require('../src/controller/SidebarRecentUser');
const SidebarRecentUser_obj = new SidebarRecentUser(validationResult);
router.post("/sidebarRecentUser", [
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
], (req, res) => SidebarRecentUser_obj.sidebarRecentUser(req, res));

//route for UserController
var UserController = require('../src/controller/UserController');
const UserController_obj = new UserController(validationResult);
//route for getting  user by its id
router.post("/getUserById", [
    check('id_user1', 'id_user1 must not be empty').not().isEmpty(),
], (req, res) => UserController_obj.getUserById(req, res));
// rout for update user profile pic
router.post("/updateImage", [
    check('_id', '_id must not be empty').not().isEmpty(),
    check('profile_pic', 'profile_pic must not be empty').not().isEmpty(),
], (req, res) => UserController_obj.updateImage(req, res));
// rout for update user profile
router.post("/updateProfile", [
    check('_id', '_id must not be empty').not().isEmpty().trim().escape(),
    check('name', 'name must not be empty').not().isEmpty().trim().escape(),
    check('email', 'email must be valid').isEmail(),
    check('email', 'email must not be empty').not().isEmpty().trim().escape(),
], (req, res) => UserController_obj.updateProfile(req, res));

//route for NodeMaillerController
var NodeMaillerController = require('../src/controller/NodeMaillerController');
const NodeMaillerController_obj = new NodeMaillerController(validationResult);
//route for registration or new users
router.post("/register", [
    //check not empty fields
    check('email', 'email must be valid').isEmail(),
    check('email', 'email must not be empty').not().isEmpty().trim().escape(),
    check('name', 'name must not be empty').not().isEmpty().trim().escape(),
    check('password', 'Password length should be 3 characters').isLength({ min: 3 }),
], (req, res) => NodeMaillerController_obj.register(req, res));
router.post("/forgotPassword", [
    //check not empty fields
    check('email', 'email must be valid').isEmail(),
    check('email', 'email must not be empty').not().isEmpty().trim().escape(),
], (req, res) => NodeMaillerController_obj.forgotPassword(req, res));

//route for UnreadCountController
var UnreadCountController = require('../src/controller/UnreadCountController');
const UnreadCountController_obj = new UnreadCountController(validationResult);
//route for update unread message count
router.post("/incUnreadCount", [
    //check not empty fields
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
    check('id_user2', 'id_user2 must not be empty').not().isEmpty().trim().escape(),
], (req, res) => UnreadCountController_obj.incUnreadCount(req, res));
//route for showing unread message count
router.post("/showUnreadCount", [
    //check not empty fields
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
], (req, res) => UnreadCountController_obj.showUnreadCount(req, res));
//route for removing unread message count
router.post("/removeMessageCount", [
    //check not empty fields
    check('id_user1', 'id_user1 must not be empty').not().isEmpty().trim().escape(),
    check('id_user2', 'id_user2 must not be empty').not().isEmpty().trim().escape(),
], (req, res) => UnreadCountController_obj.removeMessageCount(req, res));

module.exports = router;