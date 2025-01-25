import React, { useContext, useState, useRef } from 'react';
import { TextField } from '@mui/material';
import SearchContext from '../context/SearchContext';
import SessionContext from '../context/SessionContext';

export default function SearchComponent() {
  const { searchTerm, setSearchTerm, setFilteredProducts } =
    useContext(SearchContext);
  const { setErrorHandler } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const hasSearchedRef = useRef(false);

  const handleSearch = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (!hasSearchedRef.current && term) {
      try {
        const response = await fetch('/server/api/product');
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
        hasSearchedRef.current = true;
      } catch (error) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: error,
          alertColor: 'error',
        });
      }
    }

    const filtered = term
      ? products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      : products;
    setFilteredProducts(filtered);
  };

  return (
    <TextField
      size="small"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearch}
      sx={{ width: 240 }}
      variant="outlined"
    />
  );
}
