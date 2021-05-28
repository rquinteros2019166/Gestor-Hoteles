"use strict";

//Variables Globals
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//Import
var user_routes = require("./src/routes/user.route");
var hotel_routes = require("./src/routes/hotel.route");
var room_routes = require("./src/routes/room.route");
var event_route = require("./src/routes/event.route");
var service_route = require("./src/routes/service.route");
var reservation_route = require("./src/routes/reservation.route");
var bill_route = require("./src/routes/bill.route");

//Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

//Route Application localhost:3000/api/
app.use(
  "/api",
  user_routes,
  hotel_routes,
  room_routes,
  event_route,
  service_route,
  reservation_route,
  bill_route
);
//Exports
module.exports = app;
