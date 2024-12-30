import React from 'react';
import './Watchlist.css';

const Watchlist = ({ watchlist }) => {
    return (
        <div className="watchlist">
            <h2>My Watchlist</h2>
            {watchlist.length === 0 ? (
                <p>No movies in the watchlist.</p>
            ) : (
                <ul>
                    {watchlist.map((movie) => (
                        <li key={movie.id}>
                            <img src={movie.poster} alt={movie.title} />
                            <span>{movie.title}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Watchlist;
