import { useState } from 'react';

export function useProductList() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const promise = await fetch('http://localhost/server/api/product');

      const response = await promise.json();

      if (promise.ok) {
        setProducts(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { getAllProducts, products };
}
