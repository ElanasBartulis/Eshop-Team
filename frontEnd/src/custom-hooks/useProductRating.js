import { useState, useContext } from 'react';
import SessionContext from '../context/SessionContext';

export function useProductRating(
  productId,
  initialRating,
  initialRatingCount,
  onRatingUpdate
) {
  const { userData, setErrorHandler, sessionState } =
    useContext(SessionContext);

  const [rating, setRating] = useState(initialRating);
  const [ratingCount, setRatingCount] = useState(initialRatingCount);
  //Rating function
  async function handleRating(event, newValue) {
    if (!sessionState.isLogged) {
      return setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Only registrated users can rate products',
        alertColor: 'error',
      });
    }
    if (userData.admin) {
      return setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'ADMIN is not able to rate products',
        alertColor: 'error',
      });
    }
    //On rating submision creating rating for product
    try {
      const promise = await fetch('/server/api/rating/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.id,
          productId,
          ratings: newValue,
        }),
      });
      const response = await promise.json();

      if (!promise.ok) {
        return setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: 'You already rated this product',
          alertColor: 'error',
        });
      }

      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: 'Thanks for your rating!.',
        alertColor: 'success',
      });

      if (response.averageRating !== undefined) {
        setRating(response.averageRating);
        setRatingCount(response.countOfRatings);
        onRatingUpdate(productId, response.averageRating);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return { rating, ratingCount, handleRating };
}
