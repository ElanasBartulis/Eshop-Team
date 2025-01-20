import { useEffect, useState, useContext } from 'react';
import ProductCard from './ProductCard';
import Sorting from './Sorting';
import { rating } from '@material-tailwind/react';
import { useProductList } from '../custom-hooks/useProductList';
import SearchComponent from '../components/SearchComponent';
import SearchContext from '../context/SearchContext';
import frown from '../assets/Public/frown.svg';
//tevinis elementas DASHBOARD
export default function DashboardMain() {
  const { products, setProducts, getAllProducts } = useProductList();
  const { setFilteredProducts } = useContext(SearchContext);
  const { searchTerm, filteredProducts } = useContext(SearchContext);

  useEffect(() => {
    getAllProducts({ includeRatings: true });
  }, []);

  //UPDEITINAM PRODUKTU REITINGA
  function updateProductRating(productId, newRating) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, rating: newRating } : product
      )
    );
  }

  const productsToDisplay = searchTerm ? filteredProducts : products;

  return (
    <div className="mb-20 mt-16">
      <div className="grid lg:grid-cols-2 lg:grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-4 my-6">
        <div className="self-end text-3xl font-semibold text-gray-900">
          Board games!
        </div>
        <div className="lg:place-items-end md:place-items-start">
          <Sorting />
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-rows-3 gap-6 lg:grid-cols-3 md:grid-cols-2">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((data) => (
            <ProductCard
              data={data}
              key={data.id}
              onRatingUpdate={updateProductRating}
            />
          ))
        ) : (
          <div className="p-2">
            <img
              src={frown}
              alt="frown smile image"
              className="size-14"
            />
            <h2 className="text-xl p-2">No results matched...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
