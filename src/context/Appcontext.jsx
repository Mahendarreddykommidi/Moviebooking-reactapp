import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const API_URL = "https://api.themoviedb.org/3/movie";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWMwZmYzMzg4Mjc1MzdlNjY3Njk3ZTgwOGI2NTNjNSIsIm5iZiI6MTc1MDMxNjY3My4zMDU5OTk4LCJzdWIiOiI2ODUzYjY4MTFkMDkwZmViM2I3OWFlZDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UrUK2n0QvazkUaXCpORFar0i2Ns13eybzxwzctV9ZuA",
  },
};

export const AppProvider = ({ children }) => {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [popularRes, nowPlayingRes, upcomingRes] = await Promise.all([
          axios.get(`${API_URL}/popular?language=en-US&page=1`, options),
          axios.get(`${API_URL}/now_playing?language=en-US&page=1`, options),
          axios.get(`${API_URL}/upcoming?language=en-US&page=1`, options),
        ]);
        setPopular(popularRes.data.results);
        setNowPlaying(nowPlayingRes.data.results);
        setUpcoming(upcomingRes.data.results);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <AppContext.Provider value={{ popular, nowPlaying, upcoming, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export { AppContext };
