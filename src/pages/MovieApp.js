import React, { useState, useEffect } from "react";
import "./MovieApp.css";

const API_URL = "http://localhost:3002/films";

function MovieApp() {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    poster: "",
    capacity: "",
    runtime: "",
  });
  const [purchaseMessage, setPurchaseMessage] = useState("Purchase");

  // Fetch movies from API
  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch movies.");
      const data = await response.json();
      setMovieList(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Unable to load movies at the moment.");
    }
  };

  // Filter movies based on search query
  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new movie
  const handleMovieSubmit = async (event) => {
    event.preventDefault();
    if (!newMovie.title || !newMovie.description || !newMovie.poster) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) throw new Error("Failed to add movie.");
      const data = await response.json();
      setMovieList((prev) => [...prev, data]);

      // Reset the form
      setNewMovie({
        title: "",
        description: "",
        poster: "",
        capacity: "",
        runtime: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Unable to add movie. Try again later.");
    }
  };

  // Handle purchase click
  const handlePurchaseClick = () => setPurchaseMessage("Showtime!");

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movie-app">
      <h1>{purchaseMessage}</h1>
      <nav className="navbar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search movies"
        />
      </nav>

      <form className="movie-form" onSubmit={handleMovieSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          aria-label="Movie Title"
          required
        />
        <textarea
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) =>
            setNewMovie({ ...newMovie, description: e.target.value })
          }
          aria-label="Movie Description"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Poster URL"
          value={newMovie.poster}
          onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
          aria-label="Poster URL"
          required
        />
        <button type="submit">Add Movie</button>
      </form>

      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={`${movie.title} Poster`} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <button className="btn" onClick={handlePurchaseClick}>
              Purchase Movie
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieApp;
