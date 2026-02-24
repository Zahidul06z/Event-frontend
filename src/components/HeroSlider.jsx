import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/f1.webp",
    // title: "TAAGA WOMEN",
    // subtitle: "Eid / 26",
  },
  {
    id: 2,
    image: "/f2.webp",
    // title: "TAAGA MAN",
    // subtitle: "Eid / 26",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[500px] md:h-[700px] lg:h-[900px] overflow-hidden mb-[3px]">

      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[300px] sm:h-[500px] md:h-[700px] lg:h-[900px] object-cover"
            />

            {/* Content */}
            {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
                {slide.title}
              </h2>
              <p className="mt-3 text-lg">{slide.subtitle}</p>
              <button className="mt-6 px-6 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition">
                SHOP NOW
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* LEFT BUTTON (Outside Slides) */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black text-white p-3 rounded-full transition"
      >
        ❮
      </button>

      {/* RIGHT BUTTON (Outside Slides) */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black text-white p-3 rounded-full transition"
      >
        ❯
      </button>
    </div>
  );
}