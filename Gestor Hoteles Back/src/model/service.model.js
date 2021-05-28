"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var servicesSchema = Schema({
  nameService: String,
  descriptionService: String,
  price: Number,
  icon: String,
  hotelId: { type: Schema.Types.ObjectId, ref: "hotels" },
  creatorId: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("services", servicesSchema);
