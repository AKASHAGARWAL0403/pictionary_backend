import { User } from "../../models/User";
import { RoomUser } from "../../models/RoomUser";

export const findUserByName = async (name, t) => {
  return await User.findOne({
    where: { name: name },
    include: RoomUser,
  }, {transaction: t});
};

export const findUserById = async (id, t) => {
  return await User.findByPk(id, {
    include: RoomUser,
  },{transaction: t});
};

export const createUser = async (name, t) => {
  return await User.create({
    name: name,
  }, {transaction: t});
};
