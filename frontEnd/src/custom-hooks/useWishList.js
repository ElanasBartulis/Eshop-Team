import { useContext, useEffect, useState } from 'react';
import SessionContext from '../context/SessionContext';

export function useWishList() {
  const { setErrorHandler, userData } = useContext(SessionContext);

  const storageKey = userData?.id ? `wishlist_${userData.id}` : null;

  const [wishListItems, setWishListItems] = useState(() => {
    if (storageKey) {
      const savedWishList = localStorage.getItem(storageKey);
      return savedWishList ? JSON.parse(savedWishList) : [];
    }
    return [];
  });

  useEffect(() => {
    if (storageKey) {
      const savedWishList = localStorage.getItem(storageKey);
      setWishListItems(savedWishList ? JSON.parse(savedWishList) : []);
    } else {
      return setWishListItems([]);
    }
  }, [userData?.id]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(wishListItems));
    }
  }, [wishListItems, storageKey]);

  function toggleWishList(product) {
    if (!storageKey) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Please login to save items to wishlist',
        alertColor: 'error',
      });
      return;
    }

    setWishListItems((currentItems) => {
      //Tikrinam ar itemas egzistuoja wishliste
      const foundItem = currentItems.find((item) => item.id === product.id);

      if (foundItem) {
        //Jeigu produktas egzistuoja filtruojam ir panaikinam ji
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: 'Item removed from your wish list',
          alertColor: 'error',
        });
        return currentItems.filter((item) => item.id !== product.id);
      }
      //Kitu atveju pridedam produkta
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Item added to your wish list',
        alertColor: 'success',
      });
      return [...currentItems, product];
    });
  }

  function isInWishList(productId) {
    return wishListItems.some((item) => item.id === productId);
  }

  function removeFromWishlist(productId) {
    setWishListItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  function clearWishList() {
    setWishListItems([]);
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
