import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const adminModel = sequelize.define(
  "admin",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, //sukurimo metu neprideti
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
  },
  { timestamps: false }
);

export default adminModel;
