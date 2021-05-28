"use strict";
//Imports
var Hotel = require("../model/hotel.model");
var User = require("../model/user.model");
var Event = require("../model/events.model");

//Registrar Eventos
function saveEvent(req, res) {
  var eventModel = new Event();
  var params = req.body;

  if (
    params.nameEvent &&
    params.description &&
    params.typeEvent &&
    params.dateEvent &&
    params.hotelId
  ) {
    eventModel.nameEvent = params.nameEvent;
    eventModel.description = params.description;
    eventModel.typeEvent = params.typeEvent;
    eventModel.dateEvent = params.dateEvent;
    eventModel.images = params.images;
    eventModel.creatorId = req.user.sub;

    Hotel.findById(params.hotelId, (err, hotelFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (!hotelFound) {
        return res.status(500).send({ message: "No se encontro el hotel" });
      } else {
        eventModel.hotelId = params.hotelId;
        eventModel.save((err, eventSaved) => {
          if (err)
            return res.status(500).send({ message: "Error en la peticion" });

          if (!eventSaved)
            return res
              .status(500)
              .send({ message: "No se pudo guardar la habitacion" });

          return res.status(200).send({ eventSaved });
        });
      }
    });
  } else {
    return res.status(500).send({ message: "Ingrese todos los campos" });
  }
}

//Listar Eventos
function listEvents(req, res) {
  Event.find().exec((err, eventsFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!eventsFound) {
      return res.status(500).send({ message: "Error al obtener hoteles" });
    }

    return res.status(200).send({ eventsFound });
  });
}

module.exports = {
  saveEvent,
  listEvents,
};
