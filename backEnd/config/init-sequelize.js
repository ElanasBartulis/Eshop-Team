import adminModel from "../models/adminModel.js";
import sequelize from "./sequelize.js";

await sequelize.sync();
