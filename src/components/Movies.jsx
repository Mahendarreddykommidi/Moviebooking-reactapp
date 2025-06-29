import React, { useContext, useState } from "react";
import Moviecard from "../components/Moviecard";
import { AppContext } from "../context/Appcontext";

const Movies = () => {
  const { popular = [], nowPlaying = [], upcoming = [] } = useContext(AppContext) || {};
  const [loading, Setloading] = useState(false);

  return (
    <div className="space-y-10 px-2 sm:px-4 md:px-8 lg:px-16">
      <section className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {popular.slice(0, 6).map((movie) => (
              <div key={movie.id} className="w-full flex justify-center">
                <Moviecard id={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <section>
          <h2 className="text-xl font-bold mb-4">Now Playing</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {nowPlaying.slice(0, 6).map((movie) => (
              <div key={movie.id} className="w-full flex justify-center">
                <Moviecard id={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">Upcoming Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {upcoming.slice(0, 6).map((movie) => (
              <div key={movie.id} className="w-full flex justify-center">
                <Moviecard id={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Movies;
