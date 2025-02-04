import { useEffect, useState, useContext, useMemo } from 'react';
import ProductCard from './ProductCard';
import Sorting from './Sorting';
import { rating } from '@material-tailwind/react';
import { useProductList } from '../custom-hooks/useProductList';
import SearchComponent from '../components/SearchComponent';
import SearchContext from '../context/SearchContext';
import frown from '../assets/Public/frown.svg';
import { CircularProgress, Stack, TablePagination } from '@mui/material';
import { useWishList } from '../custom-hooks/useWishList';
//tevinis elementas DASHBOARD
export default function DashboardMain() {
  const { products, setProducts, getAllProducts, count, isLoading } =
    useProductList();
  const { setFilteredProducts } = useContext(SearchContext);
  const { searchTerm, filteredProducts, isSearching } =
    useContext(SearchContext);
  const [page, setPage] = useState(0); // dabartinis page 0
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const { toggleWishList, isInWishList, wishListItems } = useWishList();
  const [sortBy, setSortBy] = useState('');

  function sortItemsBy(name) {
    setSortBy(name);
    setPage(0);
  }
  // function sortProducts(data) {
  //   const productsToSort = [...data];
  //   if (sortName == 'priceAscending') {
  //     productsToSort.sort((a, b) => a.price - b.price);
  //   }
  //   if (sortName == 'priceDescending') {
  //     productsToSort.sort((a, b) => b.price - a.price);
  //   }
  //   if (sortName == 'sortByName') {
  //     productsToSort.sort((a, b) => a.name.localeCompare(b.name));
  //   }
  //   if (sortName == 'sortByRating') {
  //     productsToSort.sort((a, b) => b.rating - a.rating);
  //   }
  //   return productsToSort;
  // }

  useEffect(() => {
    getAllProducts({ page, itemsPerPage, sortBy });
  }, [page, itemsPerPage, sortBy]);

  function handleListChange(e, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  //UPDEITINAM PRODUKTU REITINGA
  function updateProductRating(productId, newRating) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, rating: newRating } : product
      )
    );
  }
  // Using useMemo to prevent not needed rerenders
  const productsToDisplay = useMemo(() => {
    return searchTerm ? filteredProducts : products;
  }, [searchTerm, filteredProducts, products]);

  return (
    <div className="mb-20 mt-16">
      <div className="grid lg:grid-cols-2 lg:grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-4 my-6">
        <div className="self-end text-3xl font-semibold text-gray-900">
          Board games!
        </div>
        <div className="lg:place-items-end md:place-items-start">
          <Sorting sortName={sortItemsBy} />
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-rows-3 gap-6 lg:grid-cols-3 md:grid-cols-2">
        {isSearching || isLoading ? (
          <Stack
            sx={{
              color: 'grey.500',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              gap: '20px',
            }}
            className="col-span-full"
            spacing={2}
            direction="row"
          >
            <CircularProgress sx={{ color: 'rgb(153 27 27)' }} />
            Loading...
          </Stack>
        ) : productsToDisplay.length > 0 ? (
          productsToDisplay.map((data) => (
            <ProductCard
              data={{
                ...data,
                rating: data.rating,
                ratingCount: data.ratingCount,
              }}
              key={data.id}
              onRatingUpdate={updateProductRating}
              toggleWishList={toggleWishList}
              isInWishList={isInWishList}
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

      <TablePagination
        rowsPerPageOptions={[12, 24, 36]}
        component="div"
        count={count}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={handleListChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
