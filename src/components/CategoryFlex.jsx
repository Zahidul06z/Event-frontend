import React from "react";

const categories = [
  { id: 1, name: "WOMEN", image: "./public/d1.webp" },
  { id: 2, name: "MEN", image: "./public/d2.webp" },
  { id: 3, name: "KIDS", image: "./public/d3.webp" },
  { id: 4, name: "HOME DECOR", image: "./public/d4.webp" },
  { id: 5, name: "JEWELLERY", image: "./public/d5.webp" },
  { id: 6, name: "SKIN & HAIR", image: "./public/d6.webp" },
  { id: 7, name: "GIFTS & CRAFTS", image: "./public/d7.webp" },
  { id: 8, name: "WEDDING", image: "./public/d8.webp" },
];

export default function CategoryFullScreen() {
  return (
    <div className="w-full">

      {/* Flex Container */}
      <div className="flex flex-wrap">

        {categories.map((item) => (
          <div
            key={item.id}
            className="
              w-full
              sm:w-1/2
              lg:w-1/4
              p-3
              group
              cursor-pointer
            "
          >
            <div className="overflow-hidden bg-white">

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-[250px]
                    sm:h-[300px]
                    lg:h-[320px]
                    object-cover
                    transition duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Label */}
              <div className="bg-gray-100 text-center py-3">
                <h3 className="text-sm sm:text-base font-semibold tracking-wide">
                  {item.name}
                </h3>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}