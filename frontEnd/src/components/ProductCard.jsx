import { useContext, useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import ProductOverview from "./ProductOverview";
import SessionContext from "./../context/SessionContext";
import { useProductRating } from "../custom-hooks/useProductRating";
import { useCart } from "../context/CartContext";
import SnackbarComponent from "../components/SnackBarComponent";

export default function ProductCard({
  data,
  onRatingUpdate,
  toggleWishList,
  isInWishList,
  imageHeight = "h-64 sm:h-72",
  containerStyles = "",
  imageStyles = "",
  contentStyles = "",
}) {
  const [open, setOpen] = useState(false);
  const {
    name,
    price,
    rating: initialRating,
    ratingCount: initialRatingCount,
    id,
    discount,
    image,
  } = data;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    rating: currentRating,
    ratingCount,
    handleRating,
  } = useProductRating(id, initialRating, initialRatingCount, onRatingUpdate);
  //Discount state
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { setErrorHandler } = useContext(SessionContext);
  //UseEffect only calclulate the discount when it changes
  useEffect(() => {
    setDiscountedPrice(data.price * (1 - data.discount / 100));
  }, [data.price, data.discount]);

  const isWishlisted = isInWishList(data.id);

  function handleWishlistClick(event) {
    event.preventDefault();
    toggleWishList(data);
  }

  const { session } = useContext(SessionContext);
  const { dispatch } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks while processing
    if (isAddingToCart) return;

    try {
      setIsAddingToCart(true);

      const requestBody = {
        productId: data.id,
        quantity: 1,
        userId: session?.user?.id,
      };

      const response = await fetch("/server/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: "Product added to cart",
        alertColor: "success",
      });

      if (!response.ok) {
        throw new Error(
          responseData.error || `HTTP error! status: ${response.status}`
        );
      }

      // Only dispatch after successful server response
      dispatch({ type: "ADD_ITEM", payload: responseData });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={`${containerStyles}`}>
      <div className="group relative block overflow-hidden cursor-pointer">
        <button
          onClick={handleWishlistClick}
          className={`absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75 ${
            isWishlisted ? `text-red-500` : ""
          }`}
        >
          <span className="sr-only">Wishlist</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isWishlisted ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <img
          onClick={handleOpen}
          src={`/server/api/upload/image/${image[0]}`}
          alt=""
          className={`w-full object-cover transition duration-500 group-hover:scale-105 sm:height-358`}
        />

        <div
          className={`relative border border-gray-100 bg-white p-6 ${contentStyles}`}
        >
          {discount === null || discount == 0 ? (
            <span className="whitespace-nowrap bg-white px-3 py-1.5 text-gray-50 text-xs font-medium"></span>
          ) : (
            <span className="whitespace-nowrap bg-red-800 px-3 py-1.5 text-gray-50 text-xs font-medium">
              {discount} %
            </span>
          )}

          <h3
            onClick={handleOpen}
            className="mt-2 text-2xl font-medium text-gray-900 hover:text-red-800"
          >
            {name}
          </h3>
          {discount ? (
            <div className="flex">
              <p className="m-1.5 font-semibold text-gray-700 text-xl">
                {discountedPrice.toFixed(2)}€
              </p>
              <p className="m-1.5 font-semibold line-through text-red-800 text-lm">
                {price.toFixed(2)}€
              </p>
            </div>
          ) : (
            <div className="flex">
              <p className="m-1.5 font-semibold text-gray-700 text-xl">
                {price.toFixed(2)}€
              </p>
            </div>
          )}

          <div className="flex gap-1">
            <Rating
              name={`rating-${id}`}
              value={currentRating}
              precision={0.5}
              onChange={handleRating}
            />
            <p>({ratingCount})</p>
          </div>
          <form className="mt-4">
            <button
              className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 1, sm: 2 },
            width: {
              xs: "95vw",
              sm: "85vw",
              md: "75vw",
              lg: "65vw",
            },
            height: {
              xs: "80vh",
              sm: "85vh",
              md: "90vh",
            },
            overflow: "auto",
            outline: "none",
            borderRadius: 1,
          }}
        >
          <ProductOverview
            data={{
              ...data,
              rating: currentRating,
              ratingCount: ratingCount,
              discountedPrice: discountedPrice,
            }}
            onRatingUpdate={onRatingUpdate}
          />
        </Box>
      </Modal>
    </div>
  );
}
