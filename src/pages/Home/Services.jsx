import React from "react";

const Services = () => {
  return (
    <div className="w-full py-12 max-w-[calc(100%-440px)] mx-auto flex flex-col md:flex-row gap-4 p-4">
      <div>
        <h3>Free Shipping on all ordres</h3>
        <p>
          Get Free Shipping on all orders over $75 and free returns to our UK
          returns centre! Items are dispatched from the US and will arrive in
          5-8 days.
        </p>
      </div>
      <div>
        <h3>Amazing customer service</h3>
        <p>
          Get Free Shipping on all orders over $75 and free returns to our UK
          returns centre! Items are dispatched from the US and will arrive in
          5-8 days.
        </p>
      </div>
      <div>
        <h3>No Customs or Duty Fees!</h3>
        <p>
          We pay these fees so you don’t have to! The total billed at checkout
          is the final amount you pay, inclusive of VAT, with no additional
          charges at the time of delivery!
        </p>
      </div>
    </div>
  );
};

export default Services;
