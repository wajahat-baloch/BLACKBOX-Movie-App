import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://omdbapi.com?apikey=a64338e";

function App() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    searchedMovies();
  }, []);

  const searchedMovies = async (title) => {
    let response = await fetch(`${API_URL}&s=${title}`);
    let data = await response.json();
    setSearchMovies(data.Search);
    console.log(data);
  };

  const handleBlackBoxClick = () => {
    searchedMovies();
    setInput("");
  };

  return (
    <div className="App">
      <div className="center">
        <h1 onClick={handleBlackBoxClick}>BLACKBOX</h1>
        <div className="search">
          <input
            placeholder="Search for movies"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchedMovies(input)}
          />
        </div>
      </div>

      {searchMovies?.length > 0 ? (
        <div className="container">
          {searchMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
