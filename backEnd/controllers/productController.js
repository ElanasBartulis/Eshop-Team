import productModel from "../models/productModel.js";
import { productCreateSchema } from "../utils/validations/ProductSchema.js";

export async function getAllProducts(req, res) {
      // Total user count
      const count = await productModel.count();

      // Get page limits
      const pageNumber = +req.query?.page || 0;
      const rowsPerPage = +req.query?.rowsPerPage || count;

  const allProducts = await productModel.findAll({      
    offset: pageNumber * rowsPerPage,
    limit: rowsPerPage
  });
  res.status(200).json({allProducts, count});
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

  // if image is uploaded
  if(req.body.image){
    const filename = req.body.image.split('\\').pop().split('/').pop();
    req.body.image = filename;
  }

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

  // if image is uploaded
  if(req.body.image){
    // take just the name istead of full path
    const filename = req.body.image.split('\\').pop().split('/').pop();
    req.body.image = filename;
  }

  const updatedProduct = await productModel.update(req.body, { where: { id } });
  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.status(201).json("Product updated!");
}
