"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservetionSchema = Schema({
  dateReservation: Date,
  dateDeperture: Date,
  dateArrival: Date,
  noDays: Number,
  idRoom: { type: Schema.Types.ObjectId, ref: "rooms" },
  services: [
    {
      service: { type: Schema.Types.ObjectId, ref: "services" },
      nameService: String,
      price: Number,
      icon: String,
    },
  ],
  subTotalService: { type: Number, default: 0 },
  subTotalRoom: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  hotelId: { type: Schema.Types.ObjectId, ref: "hotels" },
});

module.exports = mongoose.model("reservetions", reservetionSchema);
