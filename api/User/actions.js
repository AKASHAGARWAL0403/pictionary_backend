import { findUserByName, createUser } from "./repository";
import { Database } from "../../db/Database";

var s = require("underscore.string");
var errorCode = require("../../exceptions/userError");

export const addUser = async ({ name }, callback) => {
  const t = await Database.getSequelize().transaction();
  try {
    var err = {};
    var res = {};
    if (s.isBlank(name)) {
      err.status = 400;
      err.message = errorCode.NAME_NOT_DEFINED;
      t.commit();
      callback(err, res);
    }
    const checkUserExists = await findUserByName(name);
    if (checkUserExists !== null) {
      err.status = 400;
      err.message = errorCode.USER_ALREADY_EXISTS.replace("%NAME%", name);
      t.commit();
      callback(err, res);
    }
    const user = await createUser(name);
    t.commit();
    res.user = user;
    callback(null, res);
  } catch (err) {
    await t.rollback();
    err.status = 400;
    callback(err, {});
  }
};
