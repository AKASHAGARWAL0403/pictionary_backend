import { findRoomByName, createRoom } from "./repository";
import { findUserById } from "../User/repository";

var s = require("underscore.string");
var errorCode = require("../../exceptions/roomError");

/**
 * @param params.name
 * @param params.size
 * @param params.game_time
 * @param params.host_id
*/
export const addRoom = async (params, callback) => {
  var err = {};
  var res = {};
  if (s.isBlank(params.name)) {
    err.status = 400;
    err.message = errorCode.NAME_NOT_DEFINED;
    callback(err, res);
  }
  if(params.host_id === undefined || params.host_id === null){
    err.status = 400;
    err.message = errorCode.ROOM_HAS_NO_HOST;
    callback(err, res);
   }
  const checkRoomExists = await findRoomByName(params.name);
  if (checkRoomExists !== null) {
    err.status = 400;
    err.message = errorCode.ROOM_ALREADY_EXISTS.replace("%NAME%", params.name);
    callback(err, res);
  }
  const checkValidHost = await findUserById(params.host_id);
  if (checkValidHost === null) {
    err.status = 400;
    err.message = errorCode.HOST_DOES_NOT_EXIST.replace("%ID%", params.host_id);
    callback(err, res);
  }
  const room = await createRoom(params);
  res.room = room;
  callback(null, res);
};