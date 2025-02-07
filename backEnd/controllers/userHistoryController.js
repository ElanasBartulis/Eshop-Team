import productModel from '../models/productModel.js';
import userHistoryModel from '../models/userHistoryModel.js';
import UserModel from '../models/userModel.js';

export async function getAllHistory(req, res) {
  const allHistory = await userHistoryModel.findAll();
  res.status(200).json(allHistory);
}
//------------MODIFIKUOJU FUNKCIJA PAGINATIONUI
export async function getHistoryByUserId(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res.status(400).json({
      message: 'User History ID was not provided or was in wrong format',
    });

  const pageNumber = +req.query?.page || 0;
  const rowsPerPage = +req.query?.rowsPerPage || 5;
  const findUserHistoryId = await UserModel.findByPk(id, {
    attributes: [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'address',
      'postCode',
      'createdAt',
    ],
    include: {
      model: userHistoryModel,
      attributes: ['productList', 'totalPrice', 'createdAt', 'id'],
      offset: pageNumber * rowsPerPage,
      limit: rowsPerPage,
      order: [['createdAt', 'DESC']],
    },
  });

  if (!findUserHistoryId)
    return res.status(404).json({ message: 'User not found' });
  //Pasiemu kieky kiek isvis useris turi istoriju:
  const totalHistoriesCount = await userHistoryModel.count({
    where: { userId: id },
  });

  // Patikrinimas del netinkamu JSON formatu, kai kurios prekes pareidavo bloguoju formatu
  findUserHistoryId.userHistories = findUserHistoryId.userHistories.map(
    (history) => {
      if (typeof history.productList === 'string') {
        history.productList = JSON.parse(history.productList);
      }
      return history;
    }
  );

  res.status(200).json({ user: findUserHistoryId, totalHistoriesCount });
}

export async function createHistory(req, res) {
  const { userId, products } = req.body;
  if (!userId || !products || products.length === 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  let totalPrice = 0; // Price before discount and VAT
  let totalVat = 0; // Total VAT amount
  let totalDiscount = 0; // Total discount amount
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

    // Calculate base price (price × quantity)
    const basePrice = product.price * item.quantity;

    // Calculate discount if applicable
    const itemDiscount =
      product.discount > 0 ? basePrice * (product.discount / 100) : 0;

    // Price after discount
    const totalItemPrice = basePrice - itemDiscount;

    // Calculate VAT on price after discount
    const itemVat = totalItemPrice * (21 / 100);

    // Add to running totals
    totalPrice += totalItemPrice;
    totalVat += itemVat;
    totalDiscount += itemDiscount;
    productList.push({
      name: product.name,
      image: product.image[0], // Assuming image is stored as an array like in your checkout
    });
  }

  const finalTotal = totalPrice + totalVat - totalDiscount + 10;

  const history = await userHistoryModel.create({
    userId,
    productList: JSON.stringify(productList),
    totalPrice: finalTotal,
  });

  res.status(201).json({ message: 'Purchase history created', history });
}
