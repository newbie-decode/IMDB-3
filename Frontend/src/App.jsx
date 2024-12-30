import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import Watchlist from './components/WatchList';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    // Fetch movie data
    useEffect(() => {
        axios.get('http://localhost:3000/movies')
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    // Add movie to watchlist
    const addToWatchlist = (movie) => {
        if (!watchlist.some((item) => item.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
        }else{
            alert("movie already in Watchlist ")
        }
    };

    return (
        <div className="App">
            <h1>IMDB</h1>
            <div className="movies">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} addToWatchlist={addToWatchlist} />
                ))}
            </div>
            <Watchlist watchlist={watchlist} />
        </div>
    );
};

export default App;
