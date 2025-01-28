import { useState } from 'react';
import SearchContext from '../context/SearchContext';
import { useContext } from 'react';

export function useProductList() {
  const [products, setProducts] = useState([]);
  const { setFilteredProducts } = useContext(SearchContext);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  async function getAllProducts({ page = 0, itemsPerPage = 12 }) {
    try {
      setIsLoading(true);
      const productPromise = await fetch(
        `/server/api/product?page=${page}&rowsPerPage=${itemsPerPage}`
      );
      const { allProducts, totalProductCount } = await productPromise.json();
      setTotalProductCount(totalProductCount);

      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    getAllProducts,
    products,
    setProducts,
    totalProductCount,
    isLoading,
  };
}
