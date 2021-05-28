"use strict";

//Imports
var express = require("express");
var roomController = require("../controller/room.controller");
var md_authentication = require("../middlewares/authentication");

//Routes
var api = express.Router();
api.post("/saveRoom", md_authentication.ensureAuth, roomController.saveRoom);
api.get("/listRooms", roomController.listRooms);
api.get("/listRoomId/:id", roomController.listRoomId);
//Exports
module.exports = api;
