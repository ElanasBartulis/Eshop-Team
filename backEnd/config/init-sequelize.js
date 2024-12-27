import productModel from '../models/productModel.js';
import sequelize from './sequelize.js';
import adminModel from '../models/adminModel.js';
import UserModel from '../models/userModel.js';

await sequelize.sync({ alter: true });

await sequelize.sync();
