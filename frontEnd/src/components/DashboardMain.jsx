import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Sorting from './Sorting';
import { rating } from '@material-tailwind/react';
import { useProductList } from '../custom-hooks/useProductList';
//tevinis elementas DASHBOARD
export default function DashboardMain() {
  const { getAllProducts, products } = useProductList();

  useEffect(() => {
    getAllProducts();
  }, []);

  //UPDEITINAM PRODUKTU REITINGA
  function updateProductRating(productId, newRating) {
    (prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, rating: newRating } : product
      );
  }

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
        {products.map((data) => (
          <ProductCard
            data={data}
            key={data.id}
            onRatingUpdate={updateProductRating}
          />
        ))}
      </div>
    </div>
  );
}
