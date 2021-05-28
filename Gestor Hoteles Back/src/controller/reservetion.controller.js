"use strict";

var Reservation = require("../model/reservetion.model");
var Service = require("../model/service.model");
var Hotel = require("../model/hotel.model");
var Room = require("../model/room.model");

function addReservation(req, res) {
  var reservationModel = new Reservation();
  var idUser = req.user.sub;
  var idRoom = req.params.id;
  var params = req.body;
  var dateToday = new Date();
  var day1 = new Date(params.dateArrival);
  var day2 = new Date(params.dateDeperture);
  var difference = Math.abs(day2 - day1);
  var days = difference / (1000 * 3600 * 24);

  reservationModel.dateReservation = dateToday;
  reservationModel.dateArrival = params.dateArrival;
  reservationModel.dateDeperture = params.dateDeperture;
  reservationModel.noDays = days;
  reservationModel.userId = idUser;

  Room.findById(idRoom, (err, roomFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion2" });

    if (!roomFound) {
      return res.status(500).send({ message: "No se encontro la habitacion" });
    } else {
      reservationModel.hotelId = roomFound.hotelId;
      reservationModel.subTotalRoom = roomFound.price;
      reservationModel.idRoom = idRoom;
      reservationModel.save((err, reservetionSaved) => {
        if (err) {
          return res.status(500).send({ message: "Error en la peticion3" });
        }

        if (!reservetionSaved) {
          return res
            .status(500)
            .send({ message: "No se puedo guardar la reservacion" });
        } else {
          var newValues = { $set: { reservation: "Reservado" } };
          Room.findByIdAndUpdate(
            roomFound._id,
            newValues,
            (err, roomUpdate) => {
              if (err)
                return res
                  .status(500)
                  .send({ message: "Error en la peticion" });

              if (roomUpdate) {
                return res.status(200).send({ reservetionSaved });
              }
            }
          );
        }
      });
    }
  });
}

function addServiceReservation(req, res) {
  var reservationId = req.params.id;
  var serviceId = req.params.idService;
  var params = req.body;

  Service.findById(serviceId, (err, serviceFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion 1" });

    if (serviceFound) {
      Reservation.findByIdAndUpdate(
        reservationId,
        {
          $push: {
            services: {
              service: serviceFound._id,
              nameService: serviceFound.nameService,
              price: serviceFound.price,
              icon: serviceFound.icon,
            },
          },
        },
        { new: true },
        (err, serviceSaved) => {
          if (err)
            return res.status(500).send({ message: "Error en la peticion 2" });

          if (!serviceSaved) {
            return res
              .status(500)
              .send({ message: "No se pudo guardar el servicio" });
          } else {
            Reservation.findById(reservationId, (err, reservationFound) => {
              if (err)
                return res
                  .status(500)
                  .send({ message: "Error en la peticion4" });

              if (reservationFound) {
                var total =
                  reservationFound.subTotalService + serviceFound.price;

                Reservation.findByIdAndUpdate(
                  reservationId,
                  { $set: { subTotalService: total } },
                  { new: true },
                  (err, totalUpdate) => {
                    if (err)
                      return res
                        .status(500)
                        .send({ message: "Error en la peticion 5" });

                    if (totalUpdate) {
                      return res.status(200).send({
                        totalUpdate,
                      });
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
}

function listReservations(req, res) {
  Reservation.find()
    .populate("idRoom", "nameRoom reservation")
    .exec((err, reservetionsFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (!reservetionsFound) {
        return res
          .status(500)
          .send({ message: "No se pudieron obtener los datos" });
      }
      return res.status(200).send({ reservetionsFound });
    });
}

function listServiceRes(req, res) {
  var idReservation = req.params.id;
  Reservation.findById(idReservation, (err, dataRes) => {
    if (!dataRes) {
      return res
        .status(500)
        .send({ message: "No se encontro ninguna reservacion" });
    } else {
      var arrayCoincidences = [];
      dataRes.services.forEach((servicesArray) => {
        arrayCoincidences.push(servicesArray);
      });
      res.status(200).send({
        arrayCoincidences,
      });
    }
  });
}

function listReservationUser(req, res) {
  var idUser = req.user.sub;
  Reservation.find({ userId: idUser }, (err, reservationFind) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!reservationFind)
      return res
        .status(500)
        .send({ message: "No se encontro ninguna reservacion" });

    return res.status(200).send({ reservationFind });
  }).populate("idRoom hotelId", "nameRoom name");
}

//Exports
module.exports = {
  addReservation,
  addServiceReservation,
  listReservations,
  listServiceRes,
  listReservationUser,
};
