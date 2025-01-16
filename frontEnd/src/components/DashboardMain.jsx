import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Sorting from './Sorting';

export default function DashboardMain() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProductData() {
      try {
        const promise = await fetch('http://localhost/server/api/product');
        if (promise.ok) {
          const response = await promise.json();
          setProducts(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductData();
  }, []);

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
          />
        ))}
      </div>
    </div>
  );
}
