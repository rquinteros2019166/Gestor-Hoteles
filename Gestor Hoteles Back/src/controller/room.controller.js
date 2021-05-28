"use strict";
//Imports
var Hotel = require("../model/hotel.model");
var Room = require("../model/room.model");
var User = require("../model/user.model");

//Registrar Habitaciones
function saveRoom(req, res) {
  var roomModel = new Room();
  var params = req.body;

  if (params.nameRoom && params.price && params.hotelId) {
    roomModel.nameRoom = params.nameRoom;
    roomModel.price = params.price;
    roomModel.reservation = "Sin reservar";
    roomModel.image = params.image;
    roomModel.creatorId = req.user.sub;

    Hotel.findById(params.hotelId, (err, hotelFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (!hotelFound) {
        return res.status(500).send({ message: "No se encontro el hotel" });
      } else {
        roomModel.hotelId = params.hotelId;
        roomModel.save((err, roomSaved) => {
          if (err)
            return res.status(500).send({ message: "Error en la peticion" });

          if (!roomSaved)
            return res
              .status(500)
              .send({ message: "No se pudo guardar la habitacion" });

          return res.status(200).send({ roomSaved });
        });
      }
    });
  } else {
    return res.status(500).send({ message: "Ingrese todos los parametros" });
  }
}

//Listar Habitaciones
function listRooms(req, res) {
  Room.find().exec((err, roomsFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!roomsFound) {
      return res.status(500).send({ message: "Error al obtener hoteles" });
    }

    return res.status(200).send({ roomsFound });
  });
}

//Buscar Habitacion por ID
function listRoomId(req, res) {
  var idRoom = req.params.id;

  Room.findById(idRoom, (err, roomFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });
    if (!roomFound)
      return res.status(500).send({ message: "No se encontro el hotel" });

    return res.status(200).send({ roomFound });
  });
}

//Exportaciones
module.exports = {
  saveRoom,
  listRooms,
  listRoomId,
};
