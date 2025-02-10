import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import discountImage from '../assets/Public/DISCOUNT_UP_TO_50_11.png';
import saleImage from '../assets/Public/sale.png';
import welcomeImage from '../assets/Public/eshop-welcome.png';
import gameOfMonthImage from '../assets/Public/gameOfMonth.png';

export default function DashboardHeader() {
  const banners = [
    {
      type: 'sales',
      title: 'DISCOUNT UP TO 50%',
      image: discountImage,
      link: '/sales',
      buttonText: 'Shop Now',
      bgColor: 'bg-white',
    },
    {
      type: 'image',
      image: saleImage,
      bgColor: 'bg-red-800',
      alt: 'Holiday Sale',
    },
    {
      type: 'image',
      image: welcomeImage,
      bgColor: 'bg-gray-900',
      alt: 'Welcome to our E-Shop',
    },
    {
      type: 'image',
      image: gameOfMonthImage,
      bgColor: 'bg-red-800',
      alt: 'Game of the month',
    },
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Simple auto-rotation
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentBannerIndex((prev) =>
          prev === banners.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const bannerVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const renderBannerContent = (banner) => {
    if (banner.type === 'sales') {
      return (
        <div className="relative w-full h-full">
          <img
            src={banner.image}
            alt="Sales Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            <Link to={banner.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
              >
                {banner.buttonText}
              </motion.button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full">
        <img
          src={banner.image}
          alt={banner.alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <header>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBannerIndex}
            variants={bannerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className={`w-full ${banners[currentBannerIndex].bgColor} h-[300px] md:h-[400px]`}
          >
            {renderBannerContent(banners[currentBannerIndex])}
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentBannerIndex === index ? 'bg-white' : 'bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
