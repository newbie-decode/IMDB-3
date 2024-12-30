import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, addToWatchlist }) => {
    return (
        <div 
            className="movie-card" 
            title={`Genre: ${movie.genre}`} 
        >
            <img src={movie.poster} alt={movie.Title} />
            <h3>{movie.title}</h3>
            
            {/* Display Runtime */}
            <p>Duration: {movie.runtime || `N/A`}</p>
            
            <button onClick={() => addToWatchlist(movie)}>
                Add to Watchlist
            </button>
        </div>
    );
};

export default MovieCard;
