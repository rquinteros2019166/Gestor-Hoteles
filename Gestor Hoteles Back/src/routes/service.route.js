"use strict";

//Imports
var express = require("express");
var serviceController = require("../controller/service.controller");
var md_authentication = require("../middlewares/authentication");

//Routes
var api = express.Router();
api.post(
  "/addService",
  md_authentication.ensureAuth,
  serviceController.addService
);
api.get("/listServices", serviceController.listServices);
api.get("/listServiceId/:id", serviceController.listServiceId);

module.exports = api;
