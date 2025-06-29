import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/Appcontext";

const Hero = () => {
  const { popular = [] } = useContext(AppContext);
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.min(popular.length, 5));
    }, 4000);
    return () => clearInterval(interval);
  }, [popular.length]);

  if (!popular.length) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-200 text-xl font-bold">
        Loading...
      </div>
    );
  }

  const movies = popular.slice(0, 5);
  const movie = movies[current];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden  shadow-lg mb-10">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover object-center transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute left-8 top-30 z-10 text-white max-w-xl space-y-5">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow">
          {movie.title}
        </h2>
        <p className="mb-4 text-base md:text-lg line-clamp-3 drop-shadow">
          {movie.overview}
        </p>
        <div className="flex items-center gap-3 mb-2">
          <span className=" px-3 py-1 rounded-full text-xs font-semibold">
            ⭐ {movie.vote_average}
          </span>
          <span className="text-sm">{movie.release_date}</span>
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold shadow transition">
          Book Now
        </button>
      </div>
      {/* Carousel dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-white" : "bg-white/40"
            } border border-white`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;