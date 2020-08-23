/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();


var Viewcontroller = require('../src/controller/ViewController');
const  Viewcontroller_obj= new Viewcontroller();
var AddDataController = require('../src/controller/AddDataController');
const AddDataController_obj = new AddDataController();

router.get("/todo", (req, res) => Viewcontroller_obj.todo(req, res));
router.get("/home", (req, res) => Viewcontroller_obj.home(req, res));
router.get("/todoGet", (req, res) => AddDataController_obj.todoGET(req, res));
router.post("/todoPOST", (req, res) => AddDataController_obj.todoPOST(req, res));

module.exports = router;