import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onDelete: "CASCADE",
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Cart;
