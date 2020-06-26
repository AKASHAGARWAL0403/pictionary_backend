import { User } from "./User";
import { Room } from "./Room";
import { RoomUser } from "./RoomUser";

export const addRelation = () => {
    User.belongsToMany(Room, { through: RoomUser});
    Room.belongsToMany(User, { through: RoomUser});
    User.hasMany(RoomUser);
    Room.hasMany(RoomUser);
    RoomUser.belongsTo(User);
    RoomUser.belongsTo(Room);
};
