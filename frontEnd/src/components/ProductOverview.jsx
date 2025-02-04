import React, { useEffect, useState, useContext } from "react";
import Rating from "@mui/material/Rating";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import Minus from "../assets/Public/minus.svg";
import Plus from "../assets/Public/plus.svg";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useProductRating } from "../custom-hooks/useProductRating";
import { Box, Modal } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useCart } from "../context/CartContext";
import SessionContext from "./../context/SessionContext";
import SnackbarComponent from "../components/SnackBarComponent";

const ProductOverview = ({ data, onRatingUpdate }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const [value, setValue] = useState(1);
  const {
    name,
    price,
    rating: initialRating,
    ratingCount: initialRatingCount,
    id,
    description,
    image,
    discount,
    discountedPrice,
  } = data;

  const {
    rating: currentRating,
    ratingCount,
    handleRating,
  } = useProductRating(id, initialRating, initialRatingCount, onRatingUpdate);

  const { session } = useContext(SessionContext);
  const { dispatch } = useCart();
  const { setErrorHandler } = useContext(SessionContext);

  const handleQuantityChange = (newValue) => {
    const validValue = Math.max(1, Number(newValue) || 1);
    setValue(validValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value === "" ? 1 : Number(e.target.value);
    handleQuantityChange(newValue);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        productId: data.id,
        quantity: value,
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
        snackbarMessage: "Added product to cart.",
        alertColor: "success",
      });

      if (!response.ok) {
        throw new Error(
          responseData.error || `HTTP error! status: ${response.status}`
        );
      }

      dispatch({ type: "ADD_ITEM", payload: responseData });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    // Container
    <div className="container px-4 my-16">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* left image */}
        <div className="lg:w-1/2 relative">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-lg h-[670px]"
          >
            {image.map((src, index) => (
              <SwiperSlide
                key={index}
                className="!flex items-center justify-center h-full"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={`/server/api/upload/image/${src}`}
                    alt={`Product image ${index + 1}`}
                    className="max-w-full max-h-full object-contain cursor-pointer"
                    onClick={() => setImageOpen(true)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* IMAGE ZOOM MODAL */}
        <Modal
          open={imageOpen}
          onClose={() => setImageOpen(false)}
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
              p: 2,
              width: "80vw",
              height: "80vh",
              outline: "none",
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="rounded-lg w-full h-full"
            >
              {image.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/server/api/upload/image/${src}`}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Modal>
        {/* rigth side */}
        <div className="lg:w-1/2 relative flex flex-col">
          {/* Product name */}
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          {/* Rating number */}
          <div className="flex items-center mb-4 gap-1">
            <Rating
              name="half-rating"
              value={currentRating}
              precision={0.5}
              onChange={handleRating}
            />
            <p>({ratingCount})</p>
          </div>
          {/* Price number */}
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

          <div className="mb-6">
            {/* Description */}
            <p className="text-gray-600 max-h-96 overflow-y-auto prose prose-sm">
              <ReactMarkdown>{description}</ReactMarkdown>
            </p>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-4 mt-auto inset-x-0 bottom-0 w-4/5">
            <Button
              size="sm"
              className="rounded"
              onClick={() => handleQuantityChange(value - 1)}
            >
              <img
                src={Minus}
                alt="minus image"
                className="size-4 row-start-2"
                style={{ cursor: "pointer" }}
              />
            </Button>
            <Input
              type="number"
              value={value}
              onChange={handleInputChange}
              className=" border border-blue-gray-400 placeholder:text-blue-gray-400 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 row-start-2 text-center mx-3"
              style={{ width: "90px", height: "50px", paddingBottom: "15px" }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              variant="static"
            />
            <Button
              size="sm"
              className="rounded"
              onClick={() => handleQuantityChange(value + 1)}
            >
              <img
                src={Plus}
                alt="plus image"
                className="size-4 row-start-2"
                style={{ cursor: "pointer" }}
              />
            </Button>
            <button
              className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800 col-span-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
