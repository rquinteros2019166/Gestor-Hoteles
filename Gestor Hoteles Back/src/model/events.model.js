"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventsSchema = Schema({
  nameEvent: String,
  description: String,
  typeEvent: String,
  dateEvent: Date,
  images: [],
  hotelId: { type: Schema.Types.ObjectId, ref: "hotels" },
  creatorId: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("events", eventsSchema);
