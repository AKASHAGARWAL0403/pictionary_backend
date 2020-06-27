import { findUserByName, createUser } from "./repository";

var s = require("underscore.string");
var errorCode = require("../../exceptions/userError");

export const addUser = async ({ name }, callback) => {
  var err = {};
  var res = {};
  if (s.isBlank(name)) {
    err.status = 400;
    err.message = errorCode.NAME_NOT_DEFINED;
    callback(err, res);
  }
  const checkUserExists = await findUserByName(name);
  if (checkUserExists !== null) {
    err.status = 400;
    err.message = errorCode.USER_ALREADY_EXISTS.replace("%NAME%", name);
    callback(err, res);
  }
  const user = await createUser(name);
  res.user = user;
  callback(null, res);
};