import adminModel from "../models/adminModel.js";
import productModel from "../models/productModel.js";
import sequelize from "./sequelize.js";

await sequelize.sync({ alter: true });

await sequelize.sync();
