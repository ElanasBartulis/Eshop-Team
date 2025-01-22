import React, { useContext, useEffect } from 'react';
import { TextField } from '@mui/material';
import SearchContext from '../context/SearchContext';

export default function SearchComponent () {
    const { searchTerm, setSearchTerm, setFilteredProducts } = useContext(SearchContext);
  
    const handleSearch = async (event) => {
      const term = event.target.value;
      setSearchTerm(term);
  
      try {
        const response = await fetch('http://localhost/server/api/product');
        const products = await response.json();
        
        const filtered = term
        ? products.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase())
          )
        : products;
        
        setFilteredProducts(filtered);
        console.log('Search term:', term);
        console.log('Filtered products:', filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    //   console.log(filtered);
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
  };