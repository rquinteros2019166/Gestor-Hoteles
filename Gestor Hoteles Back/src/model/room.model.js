"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roomSchema = Schema({
  nameRoom: String,
  price: Number,
  reservation: String,
  image: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "users" },
  hotelId: { type: Schema.Types.ObjectId, ref: "hotels" },
});

module.exports = mongoose.model("rooms", roomSchema);
