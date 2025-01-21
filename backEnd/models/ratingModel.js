import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import UserModel from './userModel.js';
import productModel from './productModel.js';

const ratingModel = sequelize.define(
  'rating',
  {
    ratings: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: true }
);

productModel.hasMany(ratingModel, { foreignKey: 'productId' });
ratingModel.belongsTo(productModel, { foreignKey: 'productId' });

UserModel.hasMany(ratingModel, { foreignKey: 'userId' });
ratingModel.belongsTo(UserModel, { foreignKey: 'userId' });

export default ratingModel;
