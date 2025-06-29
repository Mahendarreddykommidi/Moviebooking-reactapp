import { Play, PlayIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Moviecard = ({ movie, id }) => {
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-white shadow-lg px-4 py-2 border-gray-300 rounded-xl overflow-hidden hover:translate-y-1">
      <Link to={`/movies/${movie.id}`}>
      
            <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg h-62 w-60 object-cover mb-2"
        />
            {/* Movie rating badge */}
        <span className="absolute top-2 left-2 bg-black/70 text-white rounded-2xl text-xs font-bold px-2 py-1 ">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
      <p className="text-base text-center font-semibold text-gray-800 truncate w-full mb-2">{movie.title}</p>
      <p className="mb-2">{formatDate(movie.release_date)}</p>
      <button
        onClick={() => navigate(`/movies/${id}`)}
        className="bg-red-500 w-full text-white px-6 py-2 rounded-sm font-medium hover:bg-blue-700 transition"
      >
        Book now
      </button>
      </Link>

        
        
  
    </div>
  );
};

export default Moviecard;
