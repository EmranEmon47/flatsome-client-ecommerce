import React, { useEffect, useState } from "react";
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
    heading: "Welcome to Our Website",
    text: "This is the first slide description.",
    textColor: "text-white",
  },
  {
    url: image2,
    heading: "Explore Our Website",
    text: "This is the second slide description.",
    textColor: "text-white",
  },
  {
    url: image3,
    heading: "Discover Page 4",
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
    <div className="relative w-screen h-[85vh] overflow-hidden">
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

          <div
            className={`absolute inset-0  flex flex-col justify-center items-center text-center px-4 ${slide.textColor}`}
          >
            <h2
              style={{ fontFamily: '"Dancing Script", cursive' }}
              className="text-4xl  font-medium  mb-2"
            >
              {slide.subheading}
            </h2>
            <h1 className="text-6xl  font-medium mb-4">{slide.heading}</h1>
            <p className="text-lg md:text-xl mb-6">{slide.text}</p>
            <div className="flex gap-4">
              <button
                className={`uppercase px-6 py-2 font-semibold border-2 ${
                  slide.isVideo
                    ? "border-white text-white bg-transparent hover:bg-[#445e85] hover:border-[#445e85]"
                    : "bg-[#445e85] text-white border-[#445e85] hover:border-white hover:bg-white hover:text-[#445e85]"
                } transition`}
              >
                Shop Men
              </button>
              <button
                className={`uppercase px-6 py-2 font-semibold border-2 ${
                  slide.isVideo
                    ? "border-white text-white bg-transparent hover:bg-[#445e85] hover:border-[#445e85]"
                    : "bg-[#445e85] text-white border-[#445e85] hover:border-white hover:bg-white hover:text-[#445e85]"
                } transition`}
              >
                Shop Woman
              </button>
            </div>
          </div>
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
