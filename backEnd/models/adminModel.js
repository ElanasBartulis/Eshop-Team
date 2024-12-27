import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const adminModel = sequelize.define(
  "admin",
  {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }, //sukurimo metu neprideti
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default adminModel;
