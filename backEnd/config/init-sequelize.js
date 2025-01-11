import productModel from '../models/productModel.js';
import sequelize from './sequelize.js';
import UserModel from '../models/userModel.js';
import userHistoryModel from '../models/userHistoryModel.js';

// await sequelize.sync({ alter: true });

await sequelize.sync();
