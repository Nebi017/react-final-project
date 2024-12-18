import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard.jsx";
import './MovieGallery.css'

const MovieGallery = () => {
  const [movies, setMovies] = useState({ results: [] }); 
  const [searchTerm, setSearchTerm] = useState("avengers"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [searchTerm]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const API_KEY = "6fb5eefab999af1a937650be17b407b9";
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
        );
        const data = await response.json();

        if (data.results) {
          setMovies(data);
          console.log(data)
        } else {
          setMovies({ results: [] }); 
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm]); 

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
     <div className="inpt">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchInput}
          
        />
     </div>
      <div className="gallery">
        {movies.results.length > 0 ? (
          movies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found for "{debouncedSearchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default MovieGallery;
