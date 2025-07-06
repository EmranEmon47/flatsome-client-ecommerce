import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-4  mx-auto bg-[#838282]">
      <footer className="flex justify-center p-4 bg-gray-200 item-center text-base-content">
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
