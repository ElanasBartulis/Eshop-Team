import { useProductRating } from "../../custom-hooks/useProductRating";
import { useWishList } from "../../custom-hooks/useWishList";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Wishlist({ activeSection }) {
  const { wishListItems, toggleWishList, isInWishList } = useWishList();
  const { updateProductRating } = useProductRating();

  return (
    <>
      {activeSection === "wishlist" && (
        <div className="h-full px-4 py-6">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="h-full w-full"
          >
            {wishListItems.map((item) => (
              <SwiperSlide
                key={item.id}
                className="flex justify-center justify-items-center"
              >
                <ProductCard
                  data={item}
                  onRatingUpdate={updateProductRating}
                  toggleWishList={toggleWishList}
                  isInWishList={isInWishList}
                  containerStyles="w-auto h-auto shadow-md rounded-lg"
                  imageHeight="h-auto"
                  contentStyles="p-4"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
