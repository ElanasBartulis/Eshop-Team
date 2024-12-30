import productModel from "../models/productModel.js";
import { productCreateSchema } from "../utils/validations/ProductSchema.js";

export async function getAllProducts(req, res) {
  const allProducts = await productModel.findAll();
  res.status(200).json(allProducts);
}

export async function getProductById(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res
      .status(400)
      .json({ message: "Product ID was not provided or was in wrong format" });
  const foundProduct = await productModel.findByPk(id);
  if (!foundProduct)
    return res.status(404).json({ message: "Product not found" });
  res.status(200).json(foundProduct);
}

export async function createProduct(req, res) {
  const validationResult = productCreateSchema.safeParse(req.body);
  if (!validationResult.success)
    return res.status(400).json({ error: validationResult.error.issues });

  const newProduct = await productModel.create(req.body);
  res.status(201).json(newProduct);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res
      .status(400)
      .json({ message: "Product ID was not provided or was in wrong format" });

  const deletedProduct = await productModel.destroy({ where: { id } });
  if (!deleteProduct)
    return res.status(404).json({ message: "Product not found" });
  res.status(204).json();
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
  const updatedProduct = await productModel.update(req.body, { where: { id } });
  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });
  res.status(201).json("Product updated!");
}
