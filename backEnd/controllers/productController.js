import productModel from "../models/productModel.js";
import ratingModel from "../models/ratingModel.js";
import { productCreateSchema } from "../utils/validations/ProductSchema.js";
import { Op, Sequelize } from "sequelize";
import CartItem from "../models/cartItemModel.js";
import sequelize from "../config/sequelize.js";

export async function getAllProducts(req, res) {
  const count = await productModel.count();
  const pageNumber = +req.query?.page || 0;
  const rowsPerPage = +req.query?.rowsPerPage || count;
  const sortBy = req.query?.sortBy || "createdAt";
  const order = req.query?.order || "DESC";

  try {
    let orderConfig;
    // Handle different sort cases
    switch (sortBy) {
      case "priceAscending":
        orderConfig = [["price", "ASC"]];
        break;
      case "priceDescending":
        orderConfig = [["price", "DESC"]];
        break;
      case "sortByName":
        orderConfig = [["name", "ASC"]];
        break;
      case "sortByRating":
        orderConfig = [["rating", "DESC"]];
        break;
      default:
        orderConfig = [["createdAt", "DESC"]];
    }

    if (req.query.page !== undefined || req.query.rowsPerPage !== undefined) {
      const allProducts = await productModel.findAll({
        offset: pageNumber * rowsPerPage,
        limit: rowsPerPage,
        order: orderConfig,
        attributes: {
          include: [
            // Gauti ratingsCountui naudojamas Sequelizre
            [
              Sequelize.literal(
                "(SELECT COUNT(*) FROM ratings WHERE ratings.productId = Product.id)"
              ),
              "ratingCount",
            ],
          ],
        },
      });

      return res.status(200).json({ allProducts, count });
    } else {
      const allProducts = await productModel.findAll();
      return res.status(200).json(allProducts);
    }
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res
      .status(400)
      .json({ message: "Product ID was not provided or was in wrong format" });
  const foundProduct = await productModel.findByPk(id, {
    attributes: {
      include: [
        // Gauti ratingsCountui naudojamas Sequelizre
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM ratings WHERE ratings.productId = Product.id)"
          ),
          "ratingCount",
        ],
      ],
    },
  });
  if (!foundProduct)
    return res.status(404).json({ message: "Product not found" });
  res.status(200).json(foundProduct);
}

export async function createProduct(req, res) {
  const validationResult = productCreateSchema.safeParse(req.body);
  if (!validationResult.success)
    return res.status(400).json({ error: validationResult.error.issues });

  // if image is uploaded
  if (req.body.image) {
    // if array
    if (Array.isArray(req.body.image)) {
      // process each image path in the array & give me file name
      req.body.image = req.body.image.map((imagePath) =>
        imagePath.split("\\").pop().split("/").pop()
      );
    } else {
      // single image
      req.body.image = [req.body.image.split("\\").pop().split("/").pop()];
    }
  }

  const newProduct = await productModel.create(req.body);
  res.status(201).json(newProduct);
}

export async function deleteProduct(req, res) {
  const t = await sequelize.transaction();
  //
  try {
    const { id } = req.params;
    if (!id || isNaN(id))
      return res.status(400).json({
        message: "Product ID was not provided or was in wrong format",
      });
    // First wee need delete product from cartItem model, only then we can delete product
    await CartItem.destroy({
      where: {
        productId: id,
      },
      transaction: t,
    });
    //Now we delete product
    //
    const deletedProduct = await productModel.destroy({
      where: { id },
      transaction: t,
    });
    //
    if (!deletedProduct) {
      await t.rollback();
      return res.status(404).json({ message: "Product not found" });
    }
    //
    await t.commit();
    res.status(204).json();
    //
  } catch {
    await t.rollback();
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateProductById(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res
      .status(400)
      .json({ message: "Product ID was not provided or was in wrong format" });
  const validationResult = productCreateSchema.safeParse(req.body);
  if (!validationResult.success)
    return res.status(400).json({ error: validationResult.error.issues });

  // if image is uploaded
  if (req.body.image) {
    // if array
    if (Array.isArray(req.body.image)) {
      // process each image path in the array & give me file name
      req.body.image = req.body.image.map((imagePath) =>
        imagePath.split("\\").pop().split("/").pop()
      );
    } else {
      // single image
      req.body.image = [req.body.image.split("\\").pop().split("/").pop()];
    }
  }

  const updatedProduct = await productModel.update(req.body, { where: { id } });
  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });
  res.status(201).json("Product updated!");
}

//FOR PRODUCT SEARCHING
export async function getSearchedProduct(req, res) {
  try {
    const searchTerm = req.query.term?.toLowerCase() || "";

    const searchResult = await productModel.findAll({
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
      attributes: {
        include: [
          // This subquery will count ratings directly in the database
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM ratings WHERE ratings.productId = Product.id)"
            ),
            "ratingCount",
          ],
        ],
      },
    });

    res.status(200).json(searchResult);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Error performing search" });
  }
}
