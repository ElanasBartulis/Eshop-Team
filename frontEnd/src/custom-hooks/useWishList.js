import { useContext, useEffect, useState } from 'react';
import SessionContext from '../context/SessionContext';

export function useWishList() {
  const { setErrorHandler, userData } = useContext(SessionContext);
  // Create a unique storage key for each non-admin user
  // This key is used to store wishlist items in localStorage
  // Returns null if user is admin (firstName === 'ADMIN') or not logged in
  const storageKey =
    userData?.id && userData?.firstName !== 'ADMIN'
      ? `wishlist_${userData.id}`
      : null;

  // Initialize state for storing product IDs
  // This useState uses a function to compute initial state only once
  // If there's a valid storage key, try to load existing wishlist from localStorage
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
    let isActive = true; // Add a cleanup

    async function fetchProducts() {
      // If no products in wishlist, clear product data and exit
      if (wishListIds.length === 0) {
        setWishListItems([]);
        return;
      }

      try {
        // Create an array of fetch promises for all products
        const fetchPromises = wishListIds.map(async (id) => {
          const promise = await fetch(`/server/api/product/${id}`);

          const response = await promise.json();
          return response;
        });

        const productData = await Promise.all(fetchPromises);

        // Only update if component is still mounted
        if (isActive) {
          setWishListItems(productData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        if (isActive) {
          setErrorHandler({
            isSnackbarOpen: true,
            snackbarMessage: 'Error loading wishlist items',
            alertColor: 'error',
          });
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
  // Function to add/remove items from wishlist
  function toggleWishList(product) {
    if (!storageKey) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage:
          userData?.firstName === 'ADMIN'
            ? 'Admins cannot use the wishlist feature'
            : 'Please login to save items to wishlist',
        alertColor: 'error',
      });
      return;
    }
    // Update wishlist IDs based on current state
    setWishListIds((currentIds) => {
      const foundId = currentIds.includes(product.id);
      const newIds = foundId
        ? currentIds.filter((id) => id !== product.id)
        : [...currentIds, product.id];

      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: foundId
          ? 'Item removed from your wish list'
          : 'Item added to your wish list',
        alertColor: foundId ? 'error' : 'success',
      });

      return newIds;
    });
  }

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
