const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('');

// Define Movie Schema and Model
const movieSchema = new mongoose.Schema({
    
    title: String,
    year: String,
    genre: String,
    poster: String,
    runtime: String,
});

const Movie = mongoose.model('Movie', movieSchema);

// POST - Add Movie from OMDB API
app.post('/movies', async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
         // check if movie already exists in the database
        const existingMovie = await Movie.findOne({title});
        if(existingMovie){
            return res.status(409).json({error:"movie already exists"});
        }
        // Log the request URL for debugging
        const omdbUrl = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`;
        console.log(`Requesting movie data from OMDB: ${omdbUrl}`);
        
        // Fetch movie details from OMDB API
        const response = await axios.get(omdbUrl);
        const data = response.data;

        if (data.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Save movie to database
        const newMovie = new Movie({
            title: data.Title,
            year: data.Year,
            genre: data.Genre,
            poster: data.Poster,
            runtime:data.Runtime
        });

        await newMovie.save();
        res.json(newMovie);
    } catch (err) {
        console.error('Error fetching data from OMDB:', err);
        res.status(500).json({ error: 'Error fetching movie data' });
    }
});

// GET - Retrieve Movies from Database
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        const formattedMovies = movies.map(movie => ({
            id: movie._id.toString(),  // Convert the _id to string and use it as id
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            poster: movie.poster,
            runtime: movie.runtime,
        }));
        res.json(formattedMovies);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving movies' });
    }
});

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ msg: 'IMDB API' });
});

// Start Server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(process.env.OMDB_API_KEY);
});
