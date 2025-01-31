import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const productModel = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, //sukurimo metu neprideti
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

export default productModel;
