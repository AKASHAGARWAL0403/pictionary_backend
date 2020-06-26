const { Model, DataTypes } = require("sequelize");

export class RoomUser extends Model {}

export const initRoomUser = async (sequelize) => {
  RoomUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      score: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: "room_user",
      timestamps: true,
    }
  );
};