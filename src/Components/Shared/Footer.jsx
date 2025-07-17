import React from "react";

const Footer = () => {
  return (
    <div className="w-full mx-auto">
      <footer className="flex justify-center p-4 text-black transition-all duration-500 backdrop-blur-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-white/30 dark:text-white item-center text-base-content">
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            someone Industries Ltd
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
