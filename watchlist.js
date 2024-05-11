import { getGenres, renderMovies, getFilteredData } from "./main.js";

const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
let main = document.getElementById("main");
let searchElement = document.getElementById("search");
let movieRating = document.getElementById("rating");
let movieGenre = document.getElementById("genre");
let searchValue = "";
let ratings = 0;
let genre = "";

await getGenres(movieGenre);

if (loggedInUser !== null) {
  const movies = loggedInUser.movies;
  if (movies.length === 0) {
    main.innerHTML = "Add Movies";
  } else {
    main.innerHTML = renderMovies("list", movies);
  }
  searchElement.addEventListener(
    "keyup",
    handleSearchDebounce(handleSearch, 500)
  );

  function handleGenreChange(event) {
    genre = event.target.value;
    main.innerHTML = "";
    main.innerHTML = renderMovies(
      "list",
      getFilteredData(movies, searchValue, ratings, genre)
    );
  }

  function handleSearch(event) {
    searchValue = event.target.value.toLowerCase();
    main.innerHTML = renderMovies(
      "list",
      getFilteredData(movies, searchValue, ratings, genre)
    );
  }

  function handleSearchDebounce(callback, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }
  function handleRatingFilter(event) {
    ratings = event.target.value;
    main.innerHTML = "";
    main.innerHTML = renderMovies(
      "list",
      getFilteredData(movies, searchValue, ratings, genre)
    );
  }

  movieRating.addEventListener("change", handleRatingFilter);
  movieGenre.addEventListener("change", handleGenreChange);
}

main.addEventListener("click", async (event) => {
  if (event.target.id === "removeBtn") {
    // Retrieve the movie ID associated with the clicked button
    const movieId = event.target.getAttribute("data-movie-id");
    const newMovies = loggedInUser.movies.filter(
      (movie) => movie.id !== movieId
    );
    loggedInUser.movies = newMovies;
    const requestOptions = {
      method: "PUT", // Assuming you are using the PUT method to update data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loggedInUser),
    };

    fetch(`${userUrl}update/${loggedInUser.id}`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.localStorage.setItem("user", JSON.stringify(data));
        alert(`Removed from watch list`);
      })
      .catch((error) => {
        console.error("Could not remove movie", error);
      });
  }
});
