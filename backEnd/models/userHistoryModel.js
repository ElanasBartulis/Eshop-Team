import sequelize from '../config/sequelize.js';
import UserModel from './userModel.js';
import { DataTypes } from 'sequelize';

const userHistoryModel = sequelize.define(
  'userHistory',
  {
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productList: {
      type: DataTypes.JSON,
      get() {
        const value = this.getDataValue('productList');
        if (Array.isArray(value)) {
          return value;
        }
        return value ? JSON.parse(value) : [];
      },
    },
  },
  { timestamps: true }
);

UserModel.hasMany(userHistoryModel, {
  foreignKey: { allowNull: false, name: 'userId' },
});

export default userHistoryModel;
