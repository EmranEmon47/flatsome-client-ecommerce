import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import image1 from "../../assets/hero1.jpg";
import image2 from "../../assets/hero2.jpg";
import image3 from "../../assets/hero3.jpg";
import heroVideo from "../../assets/herovideo.mp4";

const images = [
  {
    url: heroVideo,
    isVideo: true,
    subheading: "Shop Now",
    heading: "Watch Our Story",
    text: "This is the video slide description.",
    textColor: "text-white",
  },
  {
    url: image1,
    subheading: "It has finally Started",
    heading: "Huge Sale\nUp to 70% off",
    // text: "This is the first slide description.",
    textColor: "text-white",
  },
  {
    url: image2,
    subheading: "Mens Clothing",
    heading: "Hot Summer\nfashion",
    // text: "This is the second slide description.",
    textColor: "text-white",
  },
  {
    url: image3,
    subheading: "Something Nice To Buy",
    heading: "Discover\nYour Style of Clothing",
    // text: "This is the third slide description.",
    textColor: "text-white",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  return (
    <div className="relative w-screen h-[88vh] mt-20 overflow-hidden">
      {images.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.isVideo ? (
            <video
              src={slide.url}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.url}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          )}

          <motion.div
            key={current}
            className={`absolute inset-0  flex flex-col justify-center items-center text-center px-4 ${slide.textColor}`}
          >
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: '"Dancing Script", cursive' }}
              className="text-4xl   font-medium  mb-2"
            >
              {slide.subheading}
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl   font-medium mb-4 text-center leading-snug"
            >
              {slide.heading.split("\n").map((line, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? "text-6xl " : "text-3xl md:text-4xl"}
                >
                  {line}
                </div>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-6"
            >
              {slide.text}
            </motion.p>
            <div className="flex gap-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className={`uppercase px-6 py-2 font-semibold border-2 ${
                  slide.isVideo
                    ? "border-white text-white bg-transparent hover:bg-[#445e85] hover:border-[#445e85]"
                    : "bg-[#445e85] text-white border-[#445e85] hover:border-white hover:bg-white hover:text-[#445e85]"
                } transition`}
              >
                Shop Men
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className={`uppercase px-6 py-2 font-semibold border-2 ${
                  slide.isVideo
                    ? "border-white text-white bg-transparent hover:bg-[#445e85] hover:border-[#445e85]"
                    : "bg-[#445e85] text-white border-[#445e85] hover:border-white hover:bg-white hover:text-[#445e85]"
                } transition`}
              >
                Shop Woman
              </motion.button>
            </div>
          </motion.div>
        </div>
      ))}
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform text-2xl text-gray-600 hover:text-white  -translate-y-1/2 bg-none bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition z-20"
      >
        ❮
      </button>
      s{/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform text-2xl text-gray-600 hover:text-white -translate-y-1/2 bg-none bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition z-20"
      >
        ❯
      </button>
    </div>
  );
};

export default Hero;
