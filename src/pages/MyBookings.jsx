import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const MyBookings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { movie: stateMovie, theatre, showtime, selectedSeats, selectedTime } = location.state || {};

  const {
    popular = [],
    nowPlaying = [],
    upcoming = [],
  } = useContext(AppContext);

  // Fallback: find movie by id from context if not in state
  const moviedata =
    stateMovie ||
    popular.find((m) => String(m.id) === id) ||
    nowPlaying.find((m) => String(m.id) === id) ||
    upcoming.find((m) => String(m.id) === id);

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Booking Details
        </h2>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center mb-4 text-red-600">
            {moviedata ? moviedata.title : "Movie not found"}
          </h1>
          {theatre && showtime ? (
            <div className="space-y-2 text-center">
              <div>
                <span className="font-semibold">Theatre: </span>
                {theatre.name} ({theatre.location})
              </div>
              <div>
                <span className="font-semibold">Showtime: </span>
                {showtime.time} ({showtime.format}, {showtime.language})
              </div>
              <div>
                <span className="font-semibold">Price: </span>₹{showtime.price}
              </div>
              {selectedSeats && selectedSeats.length > 0 && (
                <div>
                  <span className="font-semibold">Selected Seats: </span>
                  {selectedSeats.join(", ")}
                </div>
              )}
              {selectedTime && (
                <div>
                  <span className="font-semibold">Selected Time: </span>
                  {selectedTime}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No booking details found.
            </div>
          )}
        </div>
        <button
          className="mt-6 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
          onClick={() => navigate("/")}
        >
          Book Another
        </button>
      </div>
    </div>
  );
};

export default MyBookings;
