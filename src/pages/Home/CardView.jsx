import React from "react";
import img1 from "../../assets/cardView1.jpg";
import img2 from "../../assets/cardView2.jpg";
import img3 from "../../assets/cardView3.jpg";

export const CardView = () => {
  const cards = [
    { image: img1, heading: "OUR BLOG" },
    { image: img2, heading: "JOIN OUR\nCOMPETITION" },
    { image: img3, heading: "ABOUT US" },
  ];

  return (
    <div className="w-full lg:max-w-[calc(100%-440px)] py-10 mx-auto">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center h-40 overflow-hidden cursor-pointer w-80 group "
          >
            {/* Always visible background image */}
            <div
              className="absolute inset-0 transition-transform duration-500 bg-center bg-cover group-hover:scale-110"
              style={{ backgroundImage: `url(${card.image})` }}
            ></div>

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 transition-colors duration-500 bg-black/0 group-hover:bg-black/20"></div>

            {/* Text */}
            <div className="relative z-10 flex flex-col items-center px-4 text-2xl font-semibold text-center text-white">
              {card.heading.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {/* Underline below the entire heading */}
              <div className="w-12 h-[2px] bg-gray-300 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
