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
      className="relative w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white transition-all duration-1000"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0  bg-opacity-60 z-0"></div>
      <div className="flex items-center absolute  gap-4  ">
        <hr className="flex-grow border-t border-gray-300" />
        <h2
          style={{ fontFamily: '"Dancing Script", cursive' }}
          className="text-3xl text-black font-semibold uppercase whitespace-nowrap"
        >
          Testimonials
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Review box with fade and scale transition */}
      <div
        key={current}
        className="relative z-10 p-8 mt-8 bg-none bg-opacity-10 backdrop-blur-md rounded-xl max-w-[calc(100%-440px)] text-center transition-all duration-700 ease-in-out transform scale-100 opacity-100 animate-fade-in"
      >
        <p className="text-xl md:text-2xl font-semibold italic mb-4">
          “{reviews[current].text}”
        </p>
        <div className="text-sm md:text-base text-gray-200">
          — {reviews[current].name}, via {reviews[current].platform}
        </div>

        {/* Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-[-3rem] top-1/2 transform -translate-y-1/2 bg-none bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-[-3rem] top-1/2 transform -translate-y-1/2 bg-none bg-opacity-40 hover:bg-opacity-70 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="z-10 flex space-x-2 mt-6">
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
