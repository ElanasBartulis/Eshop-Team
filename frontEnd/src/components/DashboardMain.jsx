import {
  useEffect,
  useState,
  useContext,
  useMemo,
  memo,
  useCallback,
} from 'react';
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
const DashboardMain = memo(({ salesOnly = false }) => {
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

  //Call back wont recreate function everytime
  const updateProductRating = useCallback(
    (productId, newRating) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, rating: newRating } : product
        )
      );
    },
    [setProducts]
  );
  // Using useMemo to prevent not needed rerenders

  const productsToDisplay = useMemo(() => {
    //BaseProducts defines wich product to display if search bar is active "Search term" is trigered,
    //it will display filtered products, if its not then only fetched products
    const basePoroducts = searchTerm ? filteredProducts : products;
    //If salesOnly props in dashboardMain is true, filter products that has only has discount or its discount is more than 0
    if (salesOnly) {
      const filtered = basePoroducts.filter(
        (product) => product.discount && product.discount > 0
      );
      return filtered;
    }
    //if salesOnly = flase return base product that will be displayed
    return basePoroducts;
  }, [searchTerm, filteredProducts, products, salesOnly]);

  return (
    <div className="mb-20 mt-16">
      <div className="grid lg:grid-cols-2 lg:grid-rows-1 md:grid-cols-1 md:grid-rows-2 gap-4 my-6">
        <div className="self-end text-3xl font-semibold text-gray-900">
          {salesOnly ? 'Special discounts!' : 'Board games!'}
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
        labelRowsPerPage="Products per page:"
      />
    </div>
  );
});

export default DashboardMain;
