import { useState } from "react";
import SearchContext from "../context/SearchContext";
import { useContext } from "react";

export function useProductList() {
  const [products, setProducts] = useState([]);
  const { setFilteredProducts } = useContext(SearchContext);

  async function getAllProducts() {
    try {
      const promise = await fetch("http://localhost/server/api/product");

      const response = await promise.json();

      if (promise.ok) {
        setProducts(response);
        setFilteredProducts(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { getAllProducts, products };
}
