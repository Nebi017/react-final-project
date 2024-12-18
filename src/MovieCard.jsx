import React from "react";
import './MovieCard.css'

const MovieCard = ({ movie }) => {

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"; // Placeholder if no poster_path is available
  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} />
      <div className="body">
        <h3>{movie.original_title}</h3>
        <p>{movie.overview || "No description available."}</p>
        <p><strong>Rating:</strong> {movie.vote_average || "none"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
