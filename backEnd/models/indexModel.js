import Cart from "./cartModel.js";
import CartItem from "./cartItemModel.js";
import Product from "./productModel.js";
import UserModel from "./userModel.js";

Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "CartItems",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
});

// CartItem - Product relationship
CartItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "Product",
});

Product.hasMany(CartItem, {
  foreignKey: "productId",
});

// Cart - User relationship
Cart.belongsTo(UserModel, {
  foreignKey: "userId",
});

UserModel.hasMany(Cart, {
  foreignKey: "userId",
});

export { Cart, CartItem, Product, UserModel };
