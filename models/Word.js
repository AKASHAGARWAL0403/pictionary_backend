const { Model, DataTypes } = require("sequelize");

export class Word extends Model {}

export const initWord = async (sequelize) => {
  Word.init(
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
      modelName: "word",
      timestamps: true,
    }
  );
};
