import React from "react";
import img from "../../assets/product1.jpg"; // Example image import
const News = () => {
  const posts = [
    {
      id: 1,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "12", month: "Aug" },
      image: img,
    },
    {
      id: 2,
      title: "City Lights at Night",
      description: "The charm and chaos of city life seen after dark.",
      date: { day: "20", month: "Sep" },
      image: img,
    },
    {
      id: 3,
      title: "Beachside Bliss",
      description: "Relax and recharge by the calming ocean waves.",
      date: { day: "08", month: "Jun" },
      image: img,
    },
    {
      id: 4,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "11", month: "Feb" },
      image: img,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded  relative">
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-44 object-cover"
            />
            {/* Date Badge */}
            <div className="absolute -left-4 flex flex-col items-center leading-tight text-[#445e85] hover:text-white text-center shadow border-[#445e85] hover:bg-[#445e85]  border-2  top-4 bg-white  px-3 py-1   ">
              <span className="text-sm font-medium ">{post.date.day}</span>
              <span className="text-xs font-medium ">{post.date.month}</span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm">{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
