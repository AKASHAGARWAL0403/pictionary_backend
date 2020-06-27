import { User } from "./User";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class Room extends Model {}

export const initRoom = async (sequelize) => {
  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      size: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      game_time: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
      },
      host_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        }
      },
    },
    {
      sequelize,
      modelName: "room",
      timestamps: true,
    }
  );
};
