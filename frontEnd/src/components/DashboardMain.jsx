import ProductCard from './ProductCard';
import Sorting from './Sorting';

export default function DashboardMain() {
  return (
    <>
      <div className="grid lg:grid-cols-2 lg:grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-4 my-6">
        <div className="self-end text-3xl font-semibold text-gray-900">
          Board games for you!!!!!
        </div>
        <div className="lg:place-items-end md:place-items-start">
          <Sorting />
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-rows-3 gap-6 lg:grid-cols-3 md:grid-cols-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
}
