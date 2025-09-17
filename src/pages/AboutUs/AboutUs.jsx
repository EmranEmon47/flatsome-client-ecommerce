import React from "react";
import Nav from "../../Components/Shared/Nav";
import Footer from "../../Components/Shared/Footer";

const AboutUs = () => {
  return (
    <>
      <Nav />
      <div className="text-gray-800 bg-white dark:bg-black dark:text-white">
        {/* Red glow top */}
        <div className="pointer-events-none hidden lg:block absolute top-[-50px] left-[-50px] h-60 w-60 bg-red-500 opacity-20 rounded-full blur-3xl"></div>

        {/* Red glow bottom right */}
        <div className="pointer-events-none hidden lg:block absolute bottom-[-50px] right-[-50px] h-72 w-72 bg-red-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="px-6 py-16 mx-auto space-y-12 lg:py-28 max-w-7xl">
          {/* Header */}
          <section className="space-y-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#445e85]">
              About Flatsome
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 md:text-xl dark:text-gray-300">
              Powering the next generation of e-commerce with AI-driven
              personalization, automation, and intelligence.
            </p>
          </section>

          {/* Who We Are */}
          <section className="flex flex-col items-center gap-10 lg:flex-row">
            <img
              src="https://picsum.photos/300/200?random=7"
              alt="AI technology"
              className="object-cover w-full shadow-md rounded-2xl lg:w-1/2 h-72 md:h-96"
            />
            <div className="space-y-4 lg:w-1/2">
              <h3 className="text-2xl font-semibold text-[#445e85]">
                AI at the Core of Flatsome
              </h3>
              <p>
                Flatsome is not just an e-commerce platform — it's a smart
                experience engine powered by artificial intelligence. From
                personalized product recommendations to automated inventory
                optimization, AI is woven into every aspect of our digital
                journey.
              </p>
              <p>
                Our intelligent architecture adapts to user behavior, predicts
                trends, and enhances customer satisfaction through data-driven
                design and automation.
              </p>
              <p>
                Our intelligent architecture adapts to user behavior, predicts
                trends, and enhances customer satisfaction through data-driven
                design and automation.
              </p>
            </div>
          </section>

          {/* Our Mission & Vision */}
          <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="bg-[#f1f5f9] dark:bg-[#1f2937] rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-[#445e85] mb-2">
                Our Mission
              </h4>
              <p>
                To revolutionize online shopping with machine learning and
                intelligent UX — making every Flatsome interaction smarter,
                faster, and more meaningful.
              </p>
              <p>
                To revolutionize online shopping with machine learning and
                intelligent UX — making every Flatsome interaction smarter,
                faster, and more meaningful.
              </p>
              <p>
                To revolutionize online shopping with machine learning and
                intelligent UX — making every Flatsome interaction smarter,
                faster, and more meaningful.
              </p>
            </div>
            <div className="bg-[#f1f5f9] dark:bg-[#1f2937] rounded-xl p-6 shadow">
              <h4 className="text-xl font-bold text-[#445e85] mb-2">
                Our Vision
              </h4>
              <p>
                To lead the e-commerce industry into a new era of AI-powered
                digital transformation where customer experience is intuitive,
                adaptive, and proactive.
              </p>
              <p>
                To revolutionize online shopping with machine learning and
                intelligent UX — making every Flatsome interaction smarter,
                faster, and more meaningful.
              </p>
              <p>
                To revolutionize online shopping with machine learning and
                intelligent UX — making every Flatsome interaction smarter,
                faster, and more meaningful.
              </p>
            </div>
          </section>

          {/* Core AI Capabilities */}
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-[#445e85] mb-6">
              How We Use AI
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "Personalization",
                  text: "We tailor product feeds and homepage layouts with real-time recommendation algorithms.",
                },
                {
                  title: "Search Intelligence",
                  text: "Our smart search engine understands user intent using natural language processing.",
                },
                {
                  title: "Inventory Prediction",
                  text: "We forecast product demand using AI-driven trend and behavior analytics.",
                },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 rounded-xl"
                >
                  <h4 className="text-xl font-bold text-[#445e85]">
                    {val.title}
                  </h4>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {val.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="mt-12 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-[#445e85]">
              Let's Shape the Future of Smart Commerce
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Whether you're an AI enthusiast, developer, or partner — join us
              on our journey to redefine e-commerce with intelligence.
            </p>
            <a
              href="https://github.com/EmranEmon47"
              className="inline-block mt-6 px-6 py-3 bg-[#445e85] text-white rounded hover:bg-[#2c3c53] transition"
            >
              Connect with Us
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
