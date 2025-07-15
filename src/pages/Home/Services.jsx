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
    <div className="w-full px-2 mx-auto lg:max-w-[calc(100%-440px)] py-4 lg:py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {serviceData.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center  lg::w-1/3 ${
              index < serviceData.length - 1
                ? "lg:border-r lg:border-gray-300"
                : ""
            }`}
          >
            <div>{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-700">
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
