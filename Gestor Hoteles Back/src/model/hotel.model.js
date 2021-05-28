"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hotelSchema = Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  adminUserHotel: { type: Schema.Types.ObjectId, ref: "users" },
  images: [],
  adminAplication: { type: Schema.Types.ObjectId, ref: "users" },
  creationDate: Date,
  reservations: { type: Number, default: 0 },
});

module.exports = mongoose.model("hotels", hotelSchema);
