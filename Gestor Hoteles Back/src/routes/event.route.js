"use strict";

//Imports
var express = require("express");
var eventController = require("../controller/event.controller");
var md_authentication = require("../middlewares/authentication");

var api = express.Router();
api.post("/saveEvent", md_authentication.ensureAuth, eventController.saveEvent);

api.get("/listEvents", eventController.listEvents);

//Exports
module.exports = api;
