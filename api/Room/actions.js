import { findRoomByName, createRoom, findRoomById } from "./repository";
import { findUserById } from "../User/repository";
import { Database } from "../../db/Database";

var s = require("underscore.string");
var errorCode = require("../../exceptions/roomError");
var roomUserErrorCode = require("../../exceptions/userRoomError");

/**
 * @param params.name
 * @param params.size
 * @param params.game_time
 * @param params.host_id
 */
export const addRoom = async (params, callback) => {
  const t = await Database.getSequelize().transaction();
  try {
    var err = {};
    var res = {};
    if (s.isBlank(params.name)) {
      err.status = 400;
      err.message = errorCode.NAME_NOT_DEFINED;
      t.commit();
      callback(err, res);
    }
    if (params.host_id === undefined || params.host_id === null) {
      err.status = 400;
      err.message = errorCode.ROOM_HAS_NO_HOST;
      t.commit();
      callback(err, res);
    }
    const checkRoomExists = await findRoomByName(params.name);
    if (checkRoomExists !== null) {
      err.status = 400;
      err.message = errorCode.ROOM_ALREADY_EXISTS.replace(
        "%NAME%",
        params.name
      );
      t.commit();
      callback(err, res);
    }
    const checkValidHost = await findUserById(params.host_id);
    if (checkValidHost === null) {
      err.status = 400;
      err.message = errorCode.HOST_DOES_NOT_EXIST.replace(
        "%ID%",
        params.host_id
      );
      t.commit();
      callback(err, res);
    }
    const room = await createRoom(params);
    t.commit();
    res.room = room;
    callback(null, res);
  } catch (err) {
    await t.rollback();
    err.status = 400;
    callback(err, {});
  }
};

export const addUserToRoom = async ({ userId, roomId }, callback) => {
  const t = await Database.getSequelize().transaction();
  try {
    var err = {};
    var res = {};
    if (userId === null || userId === undefined) {
      err.status = 400;
      err.message = roomUserErrorCode.USER_ID_NOT_DEFINED;
      await t.commit();
      callback(err, res);
    }
    const checkUserExists = await findUserById(userId);
    if (checkUserExists === null) {
      err.status = 400;
      err.message = roomUserErrorCode.USER_DOES_NOT_EXIST.replace(
        "%ID%",
        userId
      );
      await t.commit();
      callback(err, res);
    }
    if (roomId === null || roomId === undefined) {
      err.status = 400;
      err.message = roomUserErrorCode.ROOM_ID_NOT_DEFINED;
      await t.commit();
      callback(err, res);
    }
    const checkRoomExists = await findRoomById(roomId);
    if (checkRoomExists === null) {
      err.status = 400;
      err.message = roomUserErrorCode.ROOM_DOES_NOT_EXIST.replace(
        "%ID%",
        roomId
      );
      await t.commit();
      callback(err, res);
    }
    await checkRoomExists.addUser(checkUserExists,{ through: {active: true} }, {transaction: t });
    await t.commit();
    const room = await findRoomById(roomId);
    res.room = room;
    callback(null, res);
  } catch (err) {
    await t.rollback();
    err.status = 400;
    callback(err, {});
  }
};
