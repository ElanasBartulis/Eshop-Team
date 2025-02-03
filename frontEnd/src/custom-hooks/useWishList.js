import { useContext, useEffect, useState } from 'react';
import SessionContext from '../context/SessionContext';

export function useWishList() {
  const { setErrorHandler, userData } = useContext(SessionContext);

  // This key is used to store wishlist items in localStorage
  // Returns null if user is admin (firstName === 'ADMIN') or not logged in
  const storageKey =
    userData?.id && !userData?.admin ? `wishlist_${userData.id}` : null;

  //State for product id's
  const [wishListIds, setWishListIds] = useState(() => {
    if (storageKey) {
      const savedIds = localStorage.getItem(storageKey);
      return savedIds ? JSON.parse(savedIds) : [];
    }
    return [];
  });
  // State to store the  product data
  const [wishListItems, setWishListItems] = useState([]);

  // This effect handles user changes (logging in/out, switching between admin/user)
  // It resets the wishlist when needed and loads saved items for valid users
  useEffect(() => {
    if (!storageKey) {
      // Clear everything if user is admin or not logged in
      setWishListIds([]);
      setWishListItems([]);
      return;
    }
    // Load saved wishlist IDs from localStorage for valid users
    const savedIds = localStorage.getItem(storageKey);
    const parsedIds = savedIds ? JSON.parse(savedIds) : [];
    setWishListIds(parsedIds);
  }, [storageKey]); // This will run when admin status or user ID changes

  // This effect fetches full product data whenever the list of IDs changes
  useEffect(() => {
    let isActive = true; // Clean up function is needed for fast fetching operations, without it, it can lead to errors

    async function fetchProducts() {
      // If no products in wishlist, clear product data and exit
      if (wishListIds.length === 0) {
        setWishListItems([]);
        return;
      }

      try {
        // Create an array of fetch promises for all products
        const fetchPromises = wishListIds.map(async (id) => {
          try {
            // Add nested try-catch for individual fetch operations
            const promise = await fetch(`/server/api/product/${id}`);

            if (!promise.ok) return null; // Return null for non-existing products

            const response = await promise.json();
            return response; // Return the actual product data
          } catch (error) {
            return null; // Return null if individual fetch fails
          }
        });

        const productData = await Promise.all(fetchPromises);

        //Filter out nulls;
        const filteredProduct = productData.filter(
          (product) => product !== null
        );

        //If there is some deleteded products update those product id's;
        if (isActive) {
          if (filteredProduct.length < wishListIds.length) {
            // Set time out needed for fast state changes, react dont like when states want to mount at the same time.
            setTimeout(() => {
              const validIds = filteredProduct.map((product) => product.id);
              setWishListIds(validIds);

              setErrorHandler({
                isSnackbarOpen: true,
                snackbarMessage:
                  'Some items in your wishlist are no longer available',
                alertColor: 'warning',
              });
            }, 0);
          }
          setWishListItems(filteredProduct);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        if (isActive) {
          setTimeout(() => {
            setErrorHandler({
              isSnackbarOpen: true,
              snackbarMessage: 'Error loading wishlist items',
              alertColor: 'error',
            });
          }, 0);
        }
      }
    }

    fetchProducts();

    // Cleanup function
    return () => {
      isActive = false;
    };
  }, [wishListIds]);

  // Save wishlist IDs to localStorage whenever they change
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(wishListIds));
    }
  }, [wishListIds, storageKey]);
  // Function to add or remove items from wishlist
  function toggleWishList(product) {
    if (!storageKey) {
      setTimeout(() => {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage:
            userData?.firstName === 'ADMIN'
              ? 'Admins cannot use the wishlist feature'
              : 'Please login to save items to wishlist',
          alertColor: 'error',
        });
      }, 0);
      return;
    }
    // Update wishlist IDs based on current state
    setWishListIds((currentIds) => {
      const foundId = currentIds.includes(product.id);
      const newIds = foundId
        ? currentIds.filter((id) => id !== product.id)
        : [...currentIds, product.id];

      setTimeout(() => {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: foundId
            ? 'Item removed from your wish list'
            : 'Item added to your wish list',
          alertColor: foundId ? 'error' : 'success',
        });
      }, 0);

      return newIds;
    });
  }
  //Function to check if product is  in wish list
  function isInWishList(productId) {
    return wishListIds.includes(productId);
  }

  function removeFromWishlist(productId) {
    setWishListIds((currentIds) => currentIds.filter((id) => id !== productId));
  }

  function clearWishList() {
    setWishListIds([]);
  }

  return {
    wishListItems,
    toggleWishList,
    removeFromWishlist,
    isInWishList,
    clearWishList,
    wishListCount: wishListItems.length,
  };
}
