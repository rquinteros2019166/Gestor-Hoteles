"use strict";

//Imports
var express = require("express");
var userController = require("../controller/user.controller");
var md_authentication = require("../middlewares/authentication");

//Routes
var api = express.Router();
api.post("/saveUser", userController.saveUser);
api.post("/login", userController.login);
api.put("/editUser/:id", md_authentication.ensureAuth, userController.editUser);
api.put(
  "/editUserAdmin/:id",
  md_authentication.ensureAuth,
  userController.editUserAdmin
);
api.get("/getUserId/:idUser", userController.getUserId);
api.get("/getUsers", userController.getUsers);
api.delete(
  "/deleteUser/:idUser",
  md_authentication.ensureAuth,
  userController.deleteUser
);

//Exports
module.exports = api;
