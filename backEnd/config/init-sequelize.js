import adminModel from '../models/adminModel.js';
import UserModel from '../models/userModel.js';
import sequelize from './sequelize.js';

await sequelize.sync();
