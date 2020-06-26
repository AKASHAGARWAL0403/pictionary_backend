const { Model, DataTypes } = require("sequelize");

export class User extends Model {}

export const initUser = async (sequelize) => {
  User.init(
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
    },
    {
      sequelize,
      modelName: "user",
      timestamps: true,
    }
  );
};
