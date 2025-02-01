import Cart from "./cartModel.js";
import CartItem from "./cartItemModel.js";
import Product from "./productModel.js";
import UserModel from "./userModel.js";

Cart.hasMany(CartItem, {
  foreignKey: "cartId",
  as: "CartItems",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cartId",
});

CartItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "Product",
});

Product.hasMany(CartItem, {
  foreignKey: "productId",
});

Cart.belongsTo(UserModel, {
  foreignKey: "userId",
});

UserModel.hasMany(Cart, {
  foreignKey: "userId",
});

export { Cart, CartItem, Product, UserModel };
