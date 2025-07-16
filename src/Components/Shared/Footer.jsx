import React from "react";

const Footer = () => {
  return (
    <div className="w-full mx-auto">
      <footer className="flex justify-center p-4 text-black bg-gray-200 dark:text-white dark:bg-black item-center text-base-content">
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
