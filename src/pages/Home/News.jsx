import React from "react";

const News = () => {
  const posts = [
    {
      id: 1,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "12", month: "Aug" },
      image: "https://picsum.photos/300/200?random=0",
    },
    {
      id: 2,
      title: "City Lights at Night",
      description: "The charm and chaos of city life seen after dark.",
      date: { day: "20", month: "Sep" },
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 3,
      title: "Beachside Bliss",
      description: "Relax and recharge by the calming ocean waves.",
      date: { day: "08", month: "Jun" },
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: 4,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "11", month: "Feb" },
      image: "https://picsum.photos/300/200?random=3",
    },
  ];

  return (
    <div className="lg:max-w-[calc(100%-440px)] w-full mx-auto px-4 py-10 ">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-2xl font-medium text-gray-600 uppercase whitespace-nowrap">
          Latest News
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <div key={post.id} className="relative bg-white rounded shadow">
            <div className="relative group">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-44"
              />
              {/* Date Badge */}
              <div className="absolute -left-4 flex flex-col items-center leading-tight text-[#445e85] group-hover:text-white text-center shadow border-[#445e85] group-hover:bg-[#445e85]  border-2  top-4 bg-white  px-3 py-1   ">
                <span className="text-sm font-medium ">{post.date.day}</span>
                <span className="text-xs font-medium ">{post.date.month}</span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
