import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { useContext } from "react";
import { MapPin } from "lucide-react";

export const mockTheaters = [
  {
    id: "1",
    name: "PVR Cinemas",
    location: "Phoenix MarketCity",
    distance: "2.1 km",
    amenities: ["Parking", "Food Court", "M-Ticket"],
  },
  {
    id: "2",
    name: "INOX",
    location: "Forum Mall",
    distance: "3.5 km",
    amenities: ["Parking", "Food Court", "Wheelchair Accessible"],
  },
  {
    id: "3",
    name: "Cinepolis",
    location: "Nexus Mall",
    distance: "4.2 km",
    amenities: ["Parking", "Food Court", "IMAX"],
  },
];

export const mockShowtimes = [
  {
    id: "1",
    time: "10:30 AM",
    price: 150,
    format: "2D",
    language: "English",
    availableSeats: 120,
  },
  {
    id: "2",
    time: "1:45 PM",
    price: 200,
    format: "3D",
    language: "English",
    availableSeats: 85,
  },
  {
    id: "3",
    time: "4:30 PM",
    price: 180,
    format: "2D",
    language: "Hindi",
    availableSeats: 92,
  },
  {
    id: "4",
    time: "7:15 PM",
    price: 250,
    format: "IMAX",
    language: "English",
    availableSeats: 45,
  },
  {
    id: "5",
    time: "10:00 PM",
    price: 200,
    format: "2D",
    language: "English",
    availableSeats: 110,
  },
];

const Theatres = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    popular = [],
    nowPlaying = [],
    upcoming = [],
  } = useContext(AppContext);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedtime, Setselecttime] = useState("");

  // Find the movie by id
  const movie =
    popular.find((m) => String(m.id) === id) ||
    nowPlaying.find((m) => String(m.id) === id) ||
    upcoming.find((m) => String(m.id) === id);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-red-600">
          {movie ? movie.title : "Select a Movie"}
        </h1>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Available Theatres
        </h2>
        <div className="space-y-8">
          {mockTheaters.map((theatre, tIndex) => (
            <div
              key={tIndex}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <h3 className="text-xl font-bold mr-2">{theatre.name}</h3>
                  <span className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {theatre.location}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">{theatre.distance}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {theatre.amenities.map((amenity, aIndex) => (
                    <span
                      key={aIndex}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {mockShowtimes.map((showtime, sIndex) => (
                  <div
                    key={sIndex}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/seatlayout/${movie?.id}/${theatre.id}/${showtime.id}`,
                        { state: { movie, theatre, showtime } }
                      )
                    }
                  >
                    <p className="text-lg font-semibold mb-1">{showtime.time}</p>
                    <p className="text-sm text-gray-500">{showtime.format}</p>
                    <p className="text-sm text-gray-500 mb-2">{showtime.language}</p>
                    <p className="text-green-600 font-bold text-lg mb-1">
                      ₹{showtime.price}
                    </p>
                    <p className="text-xs text-gray-400">{showtime.availableSeats} seats</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theatres;
