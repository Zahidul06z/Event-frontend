import { useEffect, useState } from "react";

// import a1 from './public/a1.webp'

const slides = [
  {
    id: 1,
    image: '/a1.webp',
    
  },
  {
    id: 2,
    image: '/a2.webp',
    
  },
  {
    id: 3,
    image: '/a3.webp',
   
  },
  {
    id: 4,
    image: '/a4.webp',
    
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000); // change every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full 
                    h-[250px] 
                    sm:h-[350px] 
                    md:h-[550px] 
                    lg:h-[750px] 
                    xl:h-[850px] 
                    overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">

            {/* <h2 className="text-white 
                           text-xl 
                           sm:text-2xl 
                           md:text-4xl 
                           lg:text-5xl 
                           xl:text-6xl 
                           font-bold mb-3">
              {slide.title}
            </h2> */}

            {/* <p className="text-white 
                          text-sm 
                          sm:text-base 
                          md:text-lg 
                        //   lg:text-xl 
                          mb-4">
              {slide.description}
            </p> */}

            {/* <button className="px-4 py-2 
                               sm:px-6 sm:py-2.5 
                               md:px-8 md:py-3 
                               bg-white text-black 
                               text-sm sm:text-base md:text-lg
                               font-semibold 
                               rounded-full 
                               hover:bg-gray-200 
                               transition duration-300">
              Shop Now
            </button> */}
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}