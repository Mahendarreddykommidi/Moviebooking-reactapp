import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import Moviecard from '../components/Moviecard'

const Moviedetails = () => {
    const { id } = useParams()
    const { popular = [], nowPlaying = [], upcoming = [] } = useContext(AppContext)

    // Find the movie by id (id from params is a string, movie.id is a number)
    const movie =
        popular.find((m) => String(m.id) === id) ||
        nowPlaying.find((m) => String(m.id) === id) ||
        upcoming.find((m) => String(m.id) === id)

    if (!movie) {
        return <div className="text-center mt-10 text-lg text-gray-500">Movie not found.</div>
    }
        const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

    return (
        <div>    
        <div
            className="min-h-[50vh] flex items-center justify-center py-12 px-4"
            style={movie.backdrop_path ? {
                backgroundImage: ` url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

            } : {}}
        >
            <div className="   flex flex-col md:flex-row items-center gap-10 max-w-7xl w-full p-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg w-64 h-96 object-cover shadow-lg"
                />
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full text-white">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{movie.title}</h1>
                    <p className=" text-base mb-2">{formatDate(movie.release_date)} &bull; ⭐ {movie.vote_average} / 10</p>
                    <p className="text-lg mb-4">{movie.overview}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {movie.genre_ids && movie.genre_ids.map((genre, idx) => (
                            <span key={idx} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">{genre}</span>
                        ))}
                    </div>
                    <button
  onClick={() => window.location.href = `/theatres/${id}`}
  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-2 rounded-lg shadow transition"
>
  Book Now
</button>
                </div>
     
            </div>
        </div>
              <section className="py-5 px-6 md:px-16 lg:px-24 mx-auto">
          <h2 className="text-xl font-bold mb-4">Upcoming Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {upcoming.slice(0, 4).map((movie) => (
              <div key={movie.id} className="w-48">
                <Moviecard id={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </section>

        

        </div>

    )
}

export default Moviedetails