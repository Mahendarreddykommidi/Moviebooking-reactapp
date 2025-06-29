import { ArrowRight, Theater } from 'lucide-react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';

const Seatlayout = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, Setselectedseats] = useState([]);
  const {movieId}=useParams()
  console.log(movieId)
    const {
    popular = [],
    nowPlaying = [],
    upcoming = [],
  } = useContext(AppContext);
const navigate=useNavigate()
const location = useLocation();

  // Get theatre and showtime from navigation state
  const { theatre, showtime } = location.state || {};

  const handleSeatclick = (seatId) => {
    if (!selectedTime) {
      return toast.error("please slect time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("please select seats less than 5");
    }
    Setselectedseats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

    const movie =
    popular.find((m) => String(m.id) === movieId) ||
    nowPlaying.find((m) => String(m.id) ===movieId) ||
    upcoming.find((m) => String(m.id) === movieId);
    
  const renderseats = (row, count = 9) => {
    return (
      <div key={row} className="flex gap-2 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            return (
              <button
                onClick={() => handleSeatclick(seatId)}
                key={seatId}
                className={`h-8 w-8 border cursor-pointer transition-colors duration-200
                  ${selectedSeats.includes(seatId) ? "bg-green-500 text-white border-orange-300" : "bg-gray-400 text-white "}
                `}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

   const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
   const dummyTimes = [
    "10:00 AM",
    "12:30 PM",
    "3:00 PM",
    "5:30 PM",
    "8:00 PM"
  ];

  return (
    <div>
      <div className="flex flex-col mt-1 space-y-3">
        <h1 className="text-2xl font-semibold text-center py-5">Select your seat</h1>
        <h1 className='flex items-center justify-center mb-10 font-semibold text-orange-500 text-2xl'>{movie ? movie.title : "Movie not found"}</h1>
        {/* Time selection */}
        <div className="flex items-center justify-center gap-4 mb-4 px-6 md:px-16">
          {dummyTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-full border transition-colors duration-200 text-sm font-medium
                ${selectedTime === time ? "bg-green-500 text-white border-green-600" : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-green-100"}
              `}
            >
              {time}
            </button>
          ))}
        </div>
       
       
        <p className="text-center">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300 px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-5">{groupRows[0]?.map((row) => renderseats(row))}
            
          </div>
               <div className="grid grid-cols-2 gap-11 ">
            {groupRows.slice(1).map((group,idx)=>(
              <div key={idx} className="">
                {group.map(row=>renderseats(row))}
              </div>
            ))}

          </div>
          </div>
          </div>
                 <div className="flex items-center justify-center mt-30">
          <button
            onClick={() =>
              navigate(`/mybookings/${movie?.id}`, {
                state: {
                  movie,
                  theatre,
                  showtime,
                  selectedSeats,
                  selectedTime,
                },
              })
            }
            className={`flex items-center gap-2 px-10 py-3 font-medium rounded-full transition duration-300
              ${selectedSeats.length === 0
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-orange-600 text-white hover:bg-red-300"}
            `}
            disabled={selectedSeats.length === 0}
          >
            Proceed to checkout <span className="flex items-center"><ArrowRight strokeWidth={4} className="w-5" /></span>
          </button>
        </div>
    </div>
  )
}

export default Seatlayout