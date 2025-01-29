import { useContext, useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import ProductOverview from "./ProductOverview";
import SessionContext from "./../context/SessionContext";
import { useProductRating } from "../custom-hooks/useProductRating";

export default function ProductCard({
  data,
  onRatingUpdate,
  toggleWishList,
  isInWishList,
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

  const isWishlisted = isInWishList(data.id);

  function handleWishlistClick(event) {
    event.preventDefault();
    toggleWishList(data);
  }
  console.log();

  return (
    <div>
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
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="  relative border border-gray-100 bg-white p-6">
          {discount === null || discount == 0 ? (
            ""
          ) : (
            <span className="whitespace-nowrap bg-red-800 px-3 py-1.5 text-gray-50 text-xs font-medium">
              {discount} %
            </span>
          )}

          <h3
            onClick={handleOpen}
            className="mt-4 text-lg font-medium text-gray-900 hover:text-red-800"
          >
            {name}
          </h3>

          <p className="mt-1.5 font-semibold text-sm text-gray-700">{price}€</p>
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
            <button className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800">
              Add to Cart
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
            width: 900,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
          }}
        >
          <ProductOverview data={data} onRatingUpdate={onRatingUpdate} />
        </Box>
      </Modal>
    </div>
  );
}
