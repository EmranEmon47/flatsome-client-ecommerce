import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use Unicode arrows
import bgImage from "../../assets/hero3.jpg"; // Local background image

const reviews = [
  {
    name: "John Doe",
    platform: "LinkedIn",
    text: "This product changed the way we work—absolutely love it!",
  },
  {
    name: "Jane Smith",
    platform: "Facebook",
    text: "Great support team and user-friendly interface. Highly recommended.",
  },
  {
    name: "Mike Johnson",
    platform: "Twitter",
    text: "Fast, reliable, and efficient. A game-changer in the market!",
  },
  {
    name: "Emily Davis",
    platform: "LinkedIn",
    text: "The best investment for our team productivity in recent times.",
  },
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full text-white transition-all duration-1000 bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 z-0 bg-opacity-60"></div>
      <div className="absolute flex items-center gap-4 ">
        <hr className="flex-grow border-t border-gray-300" />
        <h2
          style={{ fontFamily: '"Dancing Script", cursive' }}
          className="text-lg font-semibold text-black uppercase lg:text-3xl md:text-xl whitespace-nowrap"
        >
          Testimonials
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Review box with fade and scale transition */}
      <div
        key={current}
        className="relative group z-10 p-8 mt-8 bg-none bg-opacity-10 backdrop-blur-md rounded-xl w-full lg:max-w-[calc(100%-440px)] text-center transition-all duration-700 ease-in-out transform scale-100 opacity-100 animate-fade-in"
      >
        <p className="mb-4 text-xl italic font-semibold lg:text-2xl">
          “{reviews[current].text}”
        </p>
        <div className="text-sm text-gray-200 lg:text-base">
          — {reviews[current].name}, via {reviews[current].platform}
        </div>

        {/* Arrows */}
        <button
          onClick={goToPrev}
          className="absolute hidden lg:block lg:left-[-3rem] top-1/2 transform -translate-y-1/2   p-2 "
        >
          <ChevronLeft className="hidden w-6 h-6 text-white group-hover:block" />
        </button>
        <button
          onClick={goToNext}
          className="absolute hidden lg:block lg:right-[-3rem] top-1/2 transform -translate-y-1/2  p-2 "
        >
          <ChevronRight className="hidden w-6 h-6 text-white group-hover:block" />
        </button>
      </div>

      {/* Dots */}
      <div className="z-10 flex my-4 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            } hover:bg-white transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
