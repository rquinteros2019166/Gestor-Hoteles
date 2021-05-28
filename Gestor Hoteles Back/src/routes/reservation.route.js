"use strict";

//Imports
var express = require("express");
var reservationController = require("../controller/reservetion.controller");
var md_authentication = require("../middlewares/authentication");

//routes
var api = express.Router();
api.post(
  "/addReservation/:id",
  md_authentication.ensureAuth,
  reservationController.addReservation
);
api.put(
  "/addServiceReservation/:id/:idService",
  reservationController.addServiceReservation
);
api.get("/listReservations", reservationController.listReservations);

api.get("/listServiceRes/:id", reservationController.listServiceRes);

api.get(
  "/listReservationUser",
  md_authentication.ensureAuth,
  reservationController.listReservationUser
);
//Exports
module.exports = api;
