import { useProductRating } from '../../custom-hooks/useProductRating';
import { useWishList } from '../../custom-hooks/useWishList';
import ProductCard from '../ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function Wishlist({ activeSection }) {
  const { wishListItems, toggleWishList, isInWishList } = useWishList();
  const { updateProductRating } = useProductRating();

  return (
    <>
      {activeSection === 'wishlist' && (
        <div className="h-full px-4 py-6">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            className="h-full w-full"
          >
            {wishListItems.map((item) => (
              <SwiperSlide
                key={item.id}
                className="flex justify-center"
              >
                <ProductCard
                  data={item}
                  onRatingUpdate={updateProductRating}
                  toggleWishList={toggleWishList}
                  isInWishList={isInWishList}
                  containerStyles="w-[250px] h-auto shadow-md rounded-lg"
                  imageHeight="h-[200px]"
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
