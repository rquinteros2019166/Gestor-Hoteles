"use strict";

var Reservation = require("../model/reservetion.model");
var Bill = require("../model/bill.model");
var User = require("../model/user.model");

function addBill(req, res) {
  var dateToday = Date.now();
  var subTotal;
  var billModel = new Bill();
  var reservationId = req.params.id;

  Reservation.findById(reservationId, (err, reservationFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (reservationFound) {
      subTotal =
        reservationFound.subTotalService + reservationFound.subTotalRoom;
      billModel.dateCreation = dateToday;
      billModel.userId = reservationFound.userId;
      billModel.reservationId = reservationId;
      billModel.total = subTotal;
      billModel.save((err, billSaved) => {
        if (err)
          return res.status(500).send({ message: "Error en la peticion" });

        if (!billSaved)
          return res
            .status(500)
            .send({ message: "No se pudo guardar la factura" });

        return res.status(200).send({ billSaved });
      });
    }
  });
}

function listBillId(req, res) {
  var idBill = req.params.id;
  Bill.findById(idBill, (err, billFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!billFound)
      return res.status(500).send({ message: "No se pudo obtener la factura" });

    return res.status(200).send({ billFound });
  });
}

module.exports = {
  addBill,
  listBillId,
};
