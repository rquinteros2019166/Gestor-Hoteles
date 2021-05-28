"use strict";

//Imports
var express = require("express");
var hotelController = require("../controller/hotel.controller");
var md_authentication = require("../middlewares/authentication");

//Rutas
var api = express.Router();
api.post("/saveHotel", md_authentication.ensureAuth, hotelController.saveHotel);
api.get("/listHotels", hotelController.listHotels);
api.get("/addImages/:idHotel", hotelController.addImages);
api.get("/searchHotel/:name", hotelController.searchHotel);
api.get("/listHotelId/:id", hotelController.listHotelId);
//Exports
module.exports = api;
