import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  postCode: {
    type: DataTypes.STRING,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
export default UserModel;
