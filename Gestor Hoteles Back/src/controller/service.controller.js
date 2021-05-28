//Imports
var Hotel = require("../model/hotel.model");
var User = require("../model/user.model");
var Service = require("../model/service.model");

//Registrar Servicios
function addService(req, res) {
  var serviceModel = new Service();
  var params = req.body;
  if (
    params.nameService &&
    params.descriptionService &&
    params.price &&
    params.hotelId &&
    params.icon
  ) {
    serviceModel.nameService = params.nameService;
    serviceModel.descriptionService = params.descriptionService;
    serviceModel.price = params.price;
    serviceModel.icon = params.icon;
    serviceModel.hotelId = params.hotelId;
    serviceModel.creatorId = req.user.sub;

    Hotel.findById(params.hotelId, (err, hotelFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (!hotelFound) {
        return res.status(500).send({ message: "No se encontro el hotel" });
      } else {
        serviceModel.hotelId = params.hotelId;
        serviceModel.save((err, serviceSaved) => {
          if (err)
            return res.status(500).send({ message: "Error en la peticion" });

          if (!serviceSaved)
            return res
              .status(500)
              .send({ message: "No se pudo guardar el servicio" });

          return res.status(200).send({ serviceSaved });
        });
      }
    });
  } else {
    return res.status(500).send({ message: "Ingrese todos los campos" });
  }
}

//Listar Servicios
function listServices(req, res) {
  Service.find().exec((err, servicesFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!servicesFound)
      return res
        .status(500)
        .send({ message: "Error al obtener los servicios" });

    return res.status(200).send({ servicesFound });
  });
}

function listServiceId(req, res) {
  var idService = req.params.id;

  Service.findById(idService, (err, serviceFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!serviceFound)
      return res.status(500).send({ message: "No se encontro el servicio" });

    return res.status(200).send({ serviceFound });
  });
}

module.exports = {
  addService,
  listServices,
  listServiceId,
};
