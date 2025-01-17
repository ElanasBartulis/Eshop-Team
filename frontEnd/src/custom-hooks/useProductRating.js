import { useState, useContext } from 'react';
import SessionContext from '../context/SessionContext';

export function useProductRating(productId, initialRating, onRatingUpdate) {
  const { userData } = useContext(SessionContext);

  const [rating, setRating] = useState(initialRating);
  const [ratingCount, setRatingCount] = useState(0);

  async function getRatingCount() {
    try {
      const promise = await fetch(
        `http://localhost/server/api/rating/${productId}`
      );

      if (!promise.ok) {
        alert('product not found');
      }

      const response = await promise.json();
      setRatingCount(response.countOfRatings);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  async function handleRating(event, newValue) {
    try {
      const promise = await fetch('http://localhost/server/api/rating/create', {
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
        alert('already rated');

        return;
      }

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

  return { rating, ratingCount, handleRating, getRatingCount };
}
