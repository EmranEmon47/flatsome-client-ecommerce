import React, { useEffect, useState } from "react";
import image1 from "../../assets/hero1.jpg";
import image2 from "../../assets/hero2.jpg";
import image3 from "../../assets/hero3.jpg";

const images = [
  {
    url: image1,
    heading: "Welcome to Page 1",
    text: "This is the first slide description.",
    textColor: "text-white",
  },
  {
    url: image2,
    heading: "Explore Page 2",
    text: "This is the second slide description.",
    textColor: "text-black",
  },
  {
    url: image3,
    heading: "Discover Page 3",
    text: "This is the third slide description.",
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
    <div className="relative w-screen h-screen overflow-hidden">
      {images.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.url}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0  flex flex-col justify-center items-center text-center px-4 ${slide.textColor}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slide.heading}
            </h1>
            <p className="text-lg md:text-xl mb-6">{slide.text}</p>
            <button className="bg-blue-500 px-6 py-3 rounded text-white  hover:bg-blue-600 transition">
              Shop Now
            </button>
          </div>
        </div>
      ))}
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition z-20"
      >
        ❮
      </button>
      s{/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition z-20"
      >
        ❯
      </button>
    </div>
  );
};

export default Hero;
