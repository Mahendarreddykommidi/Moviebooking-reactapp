import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Moviedetails from "./pages/Moviedetails";
import Theatres from "./pages/Theatres";
import Seatlayout from "./pages/Seatlayout";
import { Toaster } from "react-hot-toast";
import MyBookings from "./pages/MyBookings";

const App = () => {
  return (
    <>
      <div className="">
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Moviedetails />} />
          <Route path="/theatres/:id" element={<Theatres />} />
           <Route path="/seatlayout/:movieId/:theatreId/:showtimeId" element={<Seatlayout />} />
           <Route path="/mybookings/:id" element={<MyBookings />} />
      
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
