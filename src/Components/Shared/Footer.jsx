import React from "react";

const Footer = () => {
  return (
    <div className="w-full mx-auto mt-2 lg:mt-12">
      <footer className="flex justify-center p-4 py-0 mx-auto text-black transition-all duration-500 lg:py-8 backdrop-blur-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-white/30 dark:text-white item-center text-base-content">
        <div>
          <p className="text-sm text-center">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Flatsome Industries Ltd{" "}
            <a
              href="https://github.com/EmranEmon47"
              target="_blank"
              rel="emran github link"
            >
              (creator Abdullah Al Emran Emon)
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
