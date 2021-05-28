"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BillSchema = Schema({
  dateCreation: Date,
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  reservationId: { type: Schema.Types.ObjectId, ref: "reservetions" },
  total: Number,
});
module.exports = mongoose.model("bills", BillSchema);
