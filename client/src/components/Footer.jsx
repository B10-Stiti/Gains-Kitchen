import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-red-500 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: copyright */}
        <p className="text-xs text-gray-500 order-2 md:order-1">
          © {new Date().getFullYear()} GainsKitchen. All rights reserved.
        </p>

        {/* Center: logo + name */}
        <a href="/" className="flex items-center space-x-2 order-1 md:order-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" />
          <span className="text-sm font-bold text-red-500">GainsKitchen</span>
        </a>

        {/* Right: quote */}
        <p className=" text-gray-500 italic text-center order-3">
          “Fuel your gains, one recipe at a time.”
        </p>
      </div>
    </footer>
  );
};

export default Footer;
