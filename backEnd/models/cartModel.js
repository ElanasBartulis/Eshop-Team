import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";
import UserModel from "./userModel.js";

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: UserModel,
      key: "id",
      field: "userId",
    },
    onDelete: "CASCADE",
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Cart;
