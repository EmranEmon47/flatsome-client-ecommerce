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
    {
      id: 5,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "11", month: "Feb" },
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 6,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "11", month: "Feb" },
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 7,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "11", month: "Feb" },
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 8,
      title: "Exploring the Mountains",
      description:
        "Discover the beauty of nature as we explore the wild terrains.",
      date: { day: "11", month: "Feb" },
      image: "https://picsum.photos/300/200?random=3",
    },
  ];

  return (
    <div className="lg:max-w-[calc(100%-440px)] w-full mx-auto px-4 py-10 relative">
      {/* Red glow top */}
      <div className="pointer-events-none hidden lg:block absolute top-[-50px] left-[-50px] h-60 w-60 dark:bg-red-500 bg-none opacity-20 rounded-full blur-3xl"></div>

      {/* Red glow bottom right */}
      <div className="pointer-events-none hidden lg:block absolute bottom-[-50px] right-[-50px] h-72 w-72 dark:bg-red-500 bg-none opacity-10 rounded-full blur-3xl"></div>
      {/* Heading */}
      <div className="flex items-center gap-4 mb-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h2 className="text-2xl font-medium text-gray-600 uppercase whitespace-nowrap">
          Latest News Now
        </h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white backdrop-blur-lg bg-black/5 dark:bg-white/10  shadow-lg border border-white/20 dark:border-gray-700/30 transition-all duration-500 hover:shadow-xl hover:bg-black/10 dark:hover:bg-white/15 hover:scale-[1.02] hover:border-white/30 dark:hover:border-gray-600/40  h-[320px] rounded-md"
          >
            <div className="relative group">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-44"
              />
              {/* Date Badge */}
              <div className="absolute -left-4 flex flex-col items-center leading-tight text-[#445e85] group-hover:text-white text-center shadow border-[#445e85] group-hover:bg-[#445e85]  border-2  top-4 bg-white px-1  lg:px-3 py-0 lg:py-1   ">
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
