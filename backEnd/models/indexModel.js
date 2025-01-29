import Cart from "./Cart.js";
import CartItem from "./CartItem.js";
import Product from "./Product.js";
import UserModel from "./userModel.js";

// Define relationships after all models are imported
CartItem.belongsTo(Cart, {
  foreignKey: {
    name: "cartId",
    allowNull: false,
  },
});

Cart.hasMany(CartItem, {
  foreignKey: "cartId",
});

Cart.belongsTo(UserModel, {
  foreignKey: "userId",
});

UserModel.hasMany(Cart, {
  foreignKey: "userId",
});

CartItem.belongsTo(Product, {
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
});

Product.hasMany(CartItem, {
  foreignKey: "productId",
});

// Export all models
export { Cart, CartItem, Product, UserModel };
