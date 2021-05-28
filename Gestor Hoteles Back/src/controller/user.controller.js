"use strict";
//Imports
var User = require("../model/user.model");
var Reservation = require("../model/reservetion.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");

//Registrar Usuarios
function saveUser(req, res) {
  var userModel = new User();
  var params = req.body;

  if (params.name && params.email && params.user && params.password) {
    userModel.name = params.name;
    userModel.email = params.email;
    userModel.user = params.user;

    User.find({
      $or: [{ user: userModel.user }, { email: userModel.email }],
    }).exec((err, userFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (userFound && userFound.length >= 1) {
        return res.status(500).send({ message: "El usuario ya existe" });
      } else {
        bcrypt.hash(params.password, null, null, (err, passwordEncrypted) => {
          userModel.password = passwordEncrypted;
          userModel.save((err, userSaved) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error al guardar usuario" });

            if (userSaved) {
              return res.status(200).send({ userSaved });
            }
          });
        });
      }
    });
  } else {
    return res.status(500).send({ message: "Ingrese todos los parametros" });
  }
}
//Login
function login(req, res) {
  var params = req.body;
  var reservationModel = new Reservation();
  User.findOne(
    {
      email: params.email,
    },
    (err, userFound) => {
      if (err) return res.status(500).send({ message: "Error en la peticion" });

      if (userFound) {
        bcrypt.compare(
          params.password,
          userFound.password,
          (err, passVerified) => {
            if (passVerified) {
              if (params.getToken === "true") {
                return res
                  .status(200)
                  .send({ token: jwt.createToken(userFound) });
              } else {
                userFound.password = undefined;
                return res.status(200).send({ userFound });
              }
            } else {
              return res
                .status(401)
                .send({ message: "Verifica tu correo y contraseña" });
            }
          }
        );
      } else {
        return res.status(500).send({ message: "El usuario no existe" });
      }
    }
  );
}
//Listar Usuarios
function listUsers(req, res) {}

//Editar Usuario
function editUser(req, res) {
  var idUser = req.params.id;
  var params = req.body;

  delete params.password;

  if (idUser != req.user.sub) {
    return res
      .status(500)
      .send({ mensaje: "No posee los permisos para editar ese usuario" });
  } else {
    User.findByIdAndUpdate(idUser, params, { new: true }, (err, userUpdate) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!userUpdate)
        return res
          .status(500)
          .send({ mensaje: "No se a podido editar al Usuario" });

      return res.status(200).send({ userUpdate });
    });
  }
}

//Listar Usuarios
function getUsers(req, res) {
  User.find().exec((err, usersFound) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!usersFound)
      return res
        .status(500)
        .send({ message: "Error en las consulta obtener usuarios" });
    return res.status(200).send({ usersFound });
  });
}

//Listar Usuario Id
function getUserId(req, res) {
  var userId = req.params.idUser;
  User.findById(userId, (err, userFound) => {
    if (err)
      return res
        .status(500)
        .send({ mensaje: "Error en la peticion de Usuario" });

    if (!userFound)
      return res.status(500).send({ mensaje: "Error al obtener el Usuario." });

    return res.status(200).send({ userFound });
  });
}

//Eliminar Usuario
function deleteUser(req, res) {
  var idUser = req.params.idUser;

  if (req.user.sub != idUser) {
    return res.status(500).send({
      mensaje:
        "No posee los permisos para elimnar el usuario solo el administrador lo puede hacer",
    });
  } else {
    User.findByIdAndDelete(idUser, (err, userDelete) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error en la peticion usuario" });

      if (!userDelete)
        return res.status(500).send({ mensaje: "Error al eliminar usuario " });

      return res.status(200).send({ userDelete });
    });
  }
}

//Editar Usuario Admin
function editUserAdmin(req, res) {
  var idUser = req.params.id;

  if (req.user.rol != "ADMIN") {
    return res
      .status(500)
      .send({ message: "No posee los permisos para editar" });
  }
  delete params.password;
  User.findByIdAndUpdate(idUser, params, { new: true }, (err, userUpdate) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });

    if (!userUpdate)
      return res
        .status(500)
        .send({ message: "No se a podido editar al Usuario" });

    return res.status(200).send({ userUpdate });
  });
}

//Exports
module.exports = {
  saveUser,
  login,
  editUser,
  getUserId,
  deleteUser,
  getUsers,
  editUserAdmin,
};
