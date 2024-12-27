import sequelize from "../config/sequelize.js";
import UserModel from "./userModel.js";
import { DataTypes } from "sequelize";

const userHistoryModel = sequelize.define(
  "userHistory",
  {
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

UserModel.hasMany(userHistoryModel, {
  foreignKey: { allowNull: false, name: "scooterId" },
});

export default userHistoryModel;
