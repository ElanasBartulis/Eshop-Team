import { useState } from 'react';
import SearchContext from '../context/SearchContext';
import { useContext } from 'react';

export function useProductList() {
  const [products, setProducts] = useState([]);
  const { setFilteredProducts } = useContext(SearchContext);
  const [count, setcount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //Function to get products from database, with pagination
  async function getAllProducts({ page = 0, itemsPerPage = 12, sortBy }) {
    try {
      setIsLoading(true);
      const productPromise = await fetch(
        `/server/api/product?page=${page}&rowsPerPage=${itemsPerPage}&sortBy=${
          sortBy || ''
        }`
      );
      const { allProducts, count } = await productPromise.json();

      setcount(count);
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
    count,
    isLoading,
  };
}
