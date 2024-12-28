import productModel from "../models/productModel.js";
import userHistoryModel from "../models/userHistoryModel.js";
import UserModel from "../models/userModel.js";

export async function getAllHistory(req, res) {
  const allHistory = await userHistoryModel.findAll();
  res.status(200).json(allHistory);
}

export async function getHistoryByUserId(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res.status(400).json({
      message: "User History ID was not provided or was in wrong format",
    });

  const findUserHistoryId = await UserModel.findByPk(id, {
    attributes: [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "address",
      "postCode",
      "createdAt",
    ],
    include: {
      model: userHistoryModel,
    },
  });

  if (!findUserHistoryId)
    return res.status(404).json({ message: "User not found" });
  res.status(200).json(findUserHistoryId);
}

export async function createHistory(req, res) {
  const { userId, products } = req.body;
  if (!userId || !products || products.length === 0) {
    return res.status(400).json({ message: "Invalid input" });
  }
  // Calculations
  let totalPrice = 0;
  let productList = [];
  for (const item of products) {
    const product = await productModel.findByPk(item.id);
    if (!product)
      return res
        .status(404)
        .json({ message: `Product ${item.id} was not found` });

    if (item.quantity < 0 || item.quantity % 1 !== 0) {
      return res.status(404).json({ message: `Quantity not valid` });
    }

    const totalItemPrice = product.price * item.quantity;
    totalPrice += totalItemPrice;
    productList.push(product.name);
  }

  // Make purchase history
  const history = await userHistoryModel.create({
    userId,
    productList,
    totalPrice,
  });
  res.status(201).json({ message: "Purchase history created", history });
}
