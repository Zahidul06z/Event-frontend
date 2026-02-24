import React from "react";

export default function SplitBanner() {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE */}
      <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen overflow-hidden group">
        <img
          src='./public/e1.webp'
          alt="Living"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Terracotta muse
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-5">
            Explore living
          </p>
          <button className="bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition">
            SHOP NOW
          </button>
        </div> */}
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen overflow-hidden group">
        <img
          src='./public/e2.webp'
          alt="Dining"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Tales in taupe
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-5">
            Explore dining
          </p>
          <button className="bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition">
            SHOP NOW
          </button>
        </div> */}
      </div>

    </div>
  );
}