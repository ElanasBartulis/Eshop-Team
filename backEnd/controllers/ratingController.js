import e from 'express';
import productModel from '../models/productModel.js';
import ratingModel from '../models/ratingModel.js';

export async function addRating(req, res) {
  const { userId, productId, ratings } = req.body;
  try {
    // /Tikrinam ar useris jau reitingavo produkta:
    const existingRating = await ratingModel.findOne({
      where: { userId, productId },
    });

    if (existingRating) {
      return res
        .status(400)
        .json({ message: 'You have already rated this product' });
    }

    // Addinam reitinga
    await ratingModel.create({ userId, productId, ratings });

    // Suskaiciuojam reitingo vidurki
    const allratings = await ratingModel.findAll({ where: { productId } });
    const avrgRating =
      allratings.reduce((sum, r) => sum + r.ratings, 0) / allratings.length;

    // Updaitinam PRODUKTO reitinga
    await productModel.update(
      { rating: avrgRating },
      { where: { id: productId } }
    );

    return res.status(201).json({
      message: 'Rating added',
      averageRating: avrgRating,
      countOfRatings: allratings.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

//Gauti produkto ivertinimui palei produkto id

export async function getProductRatingByProductId(req, res) {
  const { productId } = req.params;

  const product = await productModel.findOne({ where: { id: productId } });
  console.log(product);
  const allratings = await ratingModel.findAll({ where: { productId } });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({
    rating: product.rating,
    productId: product.id,
    countOfRatings: allratings.length,
  });
}
