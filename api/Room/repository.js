import { Room } from "../../models/Room";
import { RoomUser } from "../../models/RoomUser";

export const findRoomByName = async (name,t) => {
  return await Room.findOne({
    where: { name: name },
    include: RoomUser,
  }, { transaction: t});
};

export const findRoomById = async (id, t) => {
  return await Room.findByPk(id , {
    include: RoomUser,
  },{transaction: t});
};

export const createRoom = async ({ name, size, game_size, host_id }, t) => {
  return await Room.create({
    name: name,
    size: size,
    game_size: game_size,
    host_id: host_id,
  },{transaction: t});
};
