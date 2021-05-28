// IMPORTS
const mongoose = require("mongoose");
const app = require("./app");
//const User = require("./src/models/user.model");
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/dbGestorHoteles", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se encuentra conectado a la base de datos");

    app.listen(3000, function () {
      console.log("Servidor corriendo en el puerto 3000");
    });
  })
  .catch((err) => console.log(err));

/*function defaultUserAdmin(req, res) {
  User.findOne({
    username: "ADMIN",
  }).exec((err, userData) => {
    if (userData) {
      console.log("Usuario por defecto ya creado");
    } else {
      var userModel = new User({
        name: "ADMIN",
        username: "ADMIN",
        email: "ADMIN@email.com",
        password: bcrypt.hashSync("123456"),
        rol: "ADMIN",
      });
      userModel.save();
      console.log("Usuario ADMIN creado con exito");
    }
  });
}

function defaultUserClient(req, res) {
  User.findOne({
    username: "CLIENT",
  }).exec((err, userData) => {
    if (userData) {
      console.log("Usuario por defecto ya creado");
    } else {
      var userModel = new User({
        name: "CLIENT",
        username: "CLIENT",
        email: "CLIENT@email.com",
        password: bcrypt.hashSync("123456"),
        rol: "CLIENT",
      });
      userModel.save();
      console.log("Usuario CLIENT creado con exito");
    }
  });
}*/
