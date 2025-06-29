import React, { useContext, useState } from "react";
import Moviecard from "../components/Moviecard";
import { AppContext } from "../context/Appcontext";

const Movies = () => {
  const { popular = [], nowPlaying = [], upcoming = [] } = useContext(AppContext) || {};
  const [loading,Setloading]=useState(false)

      {loading && 
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 rounded-xl h-80 mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>

 
  

  return (
    <div className="space-y-10">
      <section className="max-w-7xl overflow-hidden mx-auto">
        <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
        <div className="flex max-md:flex-wrap items-center justify-center gap-3">
          {popular.slice(0, 6).map((movie) => (
            <div key={movie.id} className="w-48">
              <Moviecard id={movie.id} movie={movie} />
            </div>
          ))}
        </div>
        <section className="py-5">
          <h2 className="text-xl font-bold mb-4">Now Playing</h2>
          <div className="flex flex-wrap gap-4">
            {nowPlaying.slice(0, 6).map((movie) => (
              <div key={movie.id} className="w-48">
                <Moviecard id={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </section>
        <section className="py-5">
          <h2 className="text-xl font-bold mb-4">Upcoming Movies</h2>
          <div className="flex flex-wrap gap-4">
            {upcoming.slice(0, 6).map((movie) => (
              <div key={movie.id} className="w-48">
                <Moviecard id={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </section>

        
      </section>
    </div>
  );
};
}

export default Movies
