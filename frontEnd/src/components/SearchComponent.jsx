import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import { TextField } from "@mui/material";
import SearchContext from "../context/SearchContext";
import SessionContext from "../context/SessionContext";
import { useProductList } from "../custom-hooks/useProductList";

const SearchComponent = memo(() => {
  const { searchTerm, setSearchTerm, setFilteredProducts, setIsSearching } =
    useContext(SearchContext);
  const { setErrorHandler } = useContext(SessionContext);
  const { getAllProducts } = useProductList();

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        if (!searchTerm) {
          await getAllProducts({ page: 0, itemsPerPage: 12 });

          return;
        }
        const promise = await fetch(
          `server/api/product/search?term=${searchTerm}`
        );
        const response = await promise.json();
        setFilteredProducts(response);
      } catch (error) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: error.message,
          alertColor: "error",
        });
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm]
  );

  return (
    <div className="w-[240px] sm:w-full">
      <TextField
        size="small"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{ width: "100%" }}
        variant="outlined"
      />
    </div>
  );
});
export default SearchComponent;
