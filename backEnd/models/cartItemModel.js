import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

export default CartItem;
