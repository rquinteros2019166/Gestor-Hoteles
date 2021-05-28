"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "secret_password_RQ";

exports.createToken = function (user) {
  var payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    user: user.user,
    password: user.password,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().day(10, "days").unix(),
  };
  return jwt.encode(payload, secret);
};
