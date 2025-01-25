import { useState } from 'react';
import SearchContext from '../context/SearchContext';
import { useContext } from 'react';

export function useProductList() {
  const [products, setProducts] = useState([]);
  const { setFilteredProducts } = useContext(SearchContext);

  async function getAllProducts() {
    try {
      const productPromise = await fetch('/server/api/product');
      const productResponse = await productPromise.json();

      if (!arguments[0]?.includeRatings) {
        setProducts(productResponse);
        setFilteredProducts(productResponse);
        return;
      }

      const ratingPromise = await fetch('/server/api/rating');
      const ratingResponse = await ratingPromise.json();

      const productsWithRatings = productResponse.map((product) => ({
        ...product,
        ratingCount: ratingResponse[product.id]?.countOfRatings || 0,
        rating:
          ratingResponse[product.id]?.averageRating || product.ratings || 0,
      }));
      setProducts(productsWithRatings);
    } catch (error) {
      console.log(error);
    }
  }
  return { getAllProducts, products, setProducts };
}
