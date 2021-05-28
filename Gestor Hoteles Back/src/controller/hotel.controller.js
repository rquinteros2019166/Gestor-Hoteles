"use strict";
//Imports
var Hotel = require("../model/hotel.model");
var User = require("../model/user.model");

//Registrar Hotel
function saveHotel(req, res) {
  var hotelModel = new Hotel();
  var userModel = new User();
  var params = req.body;
  var date = new Date();

  if (
    params.name &&
    params.address &&
    params.phone &&
    params.email &&
    params.adminUserHotel
  ) {
    hotelModel.name = params.name;
    hotelModel.address = params.address;
    hotelModel.phone = params.phone;
    hotelModel.email = params.email;
    hotelModel.creationDate = params.creationDate;
    hotelModel.reservations = params.reservations;
    hotelModel.adminAplication = req.user.sub;
    hotelModel.creationDate = date;
    hotelModel.images = params.images;

    User.findById(params.adminUserHotel, (err, userFound) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la peticion o no se econtro el usuario" });
      if (!userFound) {
        return res
          .status(500)
          .send({ message: "No se encontro el Adminitrador" });
      } else {
        hotelModel.adminUserHotel = params.adminUserHotel;
        hotelModel.save((err, hotelSaved) => {
          if (err)
            return res.status(500).send({ message: "Error en la peticion" });
          if (!hotelSaved) {
            return res
              .status(500)
              .send({ message: "No se pudo guardar el hotel" });
          } else {
            var idUser = { _id: params.adminUserHotel };
            var newValues = { $set: { rol: "ADMINHOTEL" } };
            User.updateOne(idUser, newValues, (err, hotelUpdate) => {
              if (err)
                return res
                  .status(500)
                  .send({ message: "Error en la peticion" });

              if (!hotelUpdate) {
                return res
                  .status(500)
                  .send({ message: "No se pudo editar el usuario" });
              } else {
                return res.status(200).send({ hotelSaved });
              }
            });
          }
        });
      }
    });
    hotelModel.adminUserHotel;
  } else {
    return res.status(500).send({ message: "Ingrese todos los parametros" });
  }
}

//Listar Hoteles
function listHotels(req, res) {
  Hotel.find()
    .populate("adminUserHotel", "name")
    .exec((err, hotelsFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (!hotelsFound) {
        return res
          .status(500)
          .send({ message: "Error en la peticion obtener hoteles" });
      }
      return res.status(200).send({ hotelsFound });
    });
}

//Guardar Imagene
function addImages(req, res) {
  var idHotel = req.params.idHotel;
  var params = req.body;

  Hotel.findById(idHotel, (err, hotelFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (hotelFound) {
      hotelFound.images.push("123,");
      console.log(hotelFound);
    } else {
      return res.status(500).send({ message: "Error en la peticion" });
    }
  });
}

//Buscar Hotel
function searchHotel(req, res) {
  var name = req.params.name;
  Hotel.findOne({ name: name }, (err, hotelFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!hotelFound)
      return res.status(500).send({ message: "Error en la busqueda de hotel" });

    return res.status(200).send({ hotelFound });
  });
}

//Buscar Hotel por ID
function listHotelId(req, res) {
  var idHotel = req.params.id;

  Hotel.findById(idHotel, (err, hotelFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });
    if (!hotelFound)
      return res.status(500).send({ message: "No se encontro el hotel" });

    return res.status(200).send({ hotelFound });
  });
}

//Exportaciones
module.exports = {
  saveHotel,
  listHotels,
  addImages,
  searchHotel,
  listHotelId,
};
