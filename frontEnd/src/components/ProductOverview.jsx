import React, { useEffect, useState } from "react";
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

const ProductOverview = ({ data, onRatingUpdate }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const [value, setValue] = useState(0);
  const {
    name,
    price,
    rating: initialRating,
    ratingCount: initialRatingCount,
    id,
    description,
    image,
  } = data;

  const {
    rating: currentRating,
    ratingCount,
    handleRating,
  } = useProductRating(id, initialRating, initialRatingCount, onRatingUpdate);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 relative">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-lg shadow-lg"
          >
            {image.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`/server/api/upload/image/${src}`}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => setImageOpen(true)}
                />
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
              className="rounded-lg shadow-lg w-full h-full"
            >
              {image.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/server/api/upload/image/${src}`}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Modal>

        <div className="lg:w-1/2 relative">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>

          <div className="flex items-center mb-4 gap-1">
            <Rating
              name="half-rating"
              value={currentRating}
              precision={0.5}
              onChange={handleRating}
            />
            <p>({ratingCount})</p>
          </div>

          <p className="text-2xl font-semibold mb-4">{price}€</p>

          <div>
            <p className="text-gray-600 mb-6">{description}</p>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-4 mt-10 absolute inset-x-0 bottom-0">
            <Button
              size="sm"
              className="rounded"
              onClick={() => setValue((cur) => (cur === 0 ? 0 : cur - 1))}
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
              onChange={(e) => setValue(Number(e.target.value))}
              className=" !border-t-blue-gray-400 placeholder:text-blue-gray-400 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 row-start-2 text-center mx-3"
              style={{ width: "70px", height: "50px" }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Button
              size="sm"
              className="rounded"
              onClick={() => setValue((cur) => cur + 1)}
            >
              <img
                src={Plus}
                alt="plus image"
                className="size-4 row-start-2"
                style={{ cursor: "pointer" }}
              />
            </Button>
            <button className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800 col-span-3">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
