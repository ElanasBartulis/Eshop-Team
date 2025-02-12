import productModel from "../models/productModel.js";
import sequelize from "./sequelize.js";
import UserModel from "../models/userModel.js";
import userHistoryModel from "../models/userHistoryModel.js";
import ratingModel from "../models/ratingModel.js";
import cartItemModel from "../models/cartItemModel.js";
import cartModel from "../models/cartModel.js";

// await sequelize.sync({ alter: true });

await sequelize.sync();
