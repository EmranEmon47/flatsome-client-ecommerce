import React from "react";
import { Link } from "react-router";
import Nav from "../../Components/Shared/Nav";
import Footer from "../../Components/Shared/Footer";

const blogs = [
  {
    id: 1,
    title: "Sustainable Feed Solutions for Tomorrow",
    description:
      "Discover how Eco Field Corporation is transforming the animal feed industry through sustainable practices and quality sourcing.",
    image: "https://picsum.photos/300/200?random=4",
    slug: "sustainable-feed-solutions",
  },
  {
    id: 2,
    title: "Organic Ingredients That Make a Difference",
    description:
      "Learn about the organic raw materials we supply and how they impact both animal health and consumer trust.",
    image: "https://picsum.photos/300/200?random=5",
    slug: "organic-ingredients-benefits",
  },
  {
    id: 3,
    title: "Global Supply Chain Challenges in Feed Industry",
    description:
      "Explore how modern supply chains are evolving, and how Eco Field ensures timely and reliable delivery.",
    image: "https://picsum.photos/300/200?random=6",
    slug: "feed-supply-chain",
  },
];

const BlogCard = ({ blog }) => (
  <div className="overflow-hidden transition duration-300 bg-white shadow-md rounded-xl dark:bg-neutral-900 hover:shadow-lg">
    <img
      src={blog.image}
      alt={blog.title}
      className="object-cover w-full h-56"
    />
    <div className="p-5">
      <h2 className="text-xl font-bold text-[#001d49] dark:text-white mb-2">
        {blog.title}
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        {blog.description}
      </p>
      <Link
        to={`/blog/${blog.slug}`}
        className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#445e85] rounded hover:bg-[#2c3c53] transition"
      >
        Read More
      </Link>
    </div>
  </div>
);

const Blogs = () => {
  return (
    <>
      <Nav />
      <section className="min-h-screen px-4 py-10 pt-16 bg-white lg:pt-28 lg:px-8 dark:bg-black">
        {/* Red glow top */}
        <div className="pointer-events-none absolute top-[-50px] left-[-50px] h-60 w-60 bg-red-500 opacity-20 rounded-full blur-3xl"></div>

        {/* Red glow bottom right */}
        <div className="pointer-events-none absolute bottom-[-50px] right-[-50px] h-72 w-72 bg-red-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-center text-[#001d49] dark:text-white mb-8">
            Our Latest Blogs
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;
