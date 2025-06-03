import React from "react";
import { Truck, Headset, ShieldCheck } from "lucide-react"; // Lucide icons

const serviceData = [
  {
    title: "Free Shipping on all orders",
    description:
      "Get Free Shipping on all orders over $75 and free returns to our UK returns centre! Items are dispatched from the US and will arrive in 5-8 days.",
    icon: <Truck className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Amazing customer service",
    description:
      "Our support team is here to help with anything you need. Fast, friendly, and knowledgeable service available 24/7.",
    icon: <Headset className="w-8 h-8 text-green-500" />,
  },
  {
    title: "No Customs or Duty Fees!",
    description:
      "We pay these fees so you don’t have to! The total billed at checkout is the final amount you pay, inclusive of VAT.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
  },
];

const Services = () => {
  return (
    <div className="w-full py-16 px-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between">
        {serviceData.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center gap-2 px-4 md:w-1/3 ${
              index < serviceData.length - 1
                ? "md:border-r md:border-gray-300"
                : ""
            }`}
          >
            <div>{service.icon}</div>
            <h3 className="text-lg text-gray-700 font-semibold">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
