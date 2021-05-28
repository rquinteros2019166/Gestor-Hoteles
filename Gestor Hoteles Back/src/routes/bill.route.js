"use strict";

//Imports
var express = require("express");
var billController = require("../controller/bill.controller");
var md_authentication = require("../middlewares/authentication");

var api = express.Router();
api.post("/addBill/:id", billController.addBill);
api.get("/listBillId/:id", billController.listBillId);

//Exports
module.exports = api;
