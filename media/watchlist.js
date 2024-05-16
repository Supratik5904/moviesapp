import {
  getGenres,
  renderMovies,
  getFilteredData,
  renderShows,
} from "./main.js";
import { createSidebar } from "../sidebar.js";

import { userUrl } from "../constants.js";
const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
let main = document.getElementById("main");
let searchElement = document.getElementById("search");
let movieRating = document.getElementById("rating");
let movieGenre = document.getElementById("genre");
let movies = document.getElementById("movies");
let shows = document.getElementById("shows");
let searchValue = "";
let ratings = 0;
let genre = "";
let parentContainer = document.getElementById("content");

window.onload = function () {
  // Get the container where you want to load the sidebar
  // Load the sidebar content into the container
  parentContainer.appendChild(createSidebar());
  const hamBurger = document.querySelector(".toggle-btn");

  hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
    document
      .getElementById("watchListContent")
      .classList.toggle("shift_navbar");
  });
};

await getGenres(movieGenre);

if (loggedInUser !== null) {
  const moviesList = loggedInUser.movies;
  const showsList = loggedInUser.shows;
  if (moviesList.length === 0) {
    movies.innerHTML = "Add Movies";
  } else {
    movies.innerHTML = renderMovies("list", moviesList);
  }
  if (showsList.length === 0) {
    shows.innerHTML = "Add Shows";
  } else {
    shows.innerHTML = renderShows("list", showsList);
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

  movies.addEventListener("click", async (event) => {
    if (event.target.id === "removeBtn") {
      // Retrieve the movie ID associated with the clicked button
      const movieId = event.target.getAttribute("data-movie-id");
      const newMovies = loggedInUser.movies.filter(
        (movie) => movie.id != movieId
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
    } else {
      let targetElement = event.target;
      while (targetElement && !targetElement.matches(".card")) {
        targetElement = targetElement.parentElement;
      }

      // Check if we found a card element
      if (targetElement && targetElement.matches(".card")) {
        // Access the data-movie-id attribute value
        const movieId = targetElement.getAttribute("data-movie-id");
        window.location.href = `details.html?movieId=${movieId}`;
      }
    }
  });

  shows.addEventListener("click", async (event) => {
    if (event.target.id === "removeBtn") {
      // Retrieve the movie ID associated with the clicked button
      const showId = event.target.getAttribute("data-show-id");
      const newShows = loggedInUser.shows.filter((show) => show.id != showId);
      loggedInUser.shows = newShows;
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
          console.error("Could not remove Show", error);
        });
    } else {
      let targetElement = event.target;
      while (targetElement && !targetElement.matches(".card")) {
        targetElement = targetElement.parentElement;
      }

      // Check if we found a card element
      if (targetElement && targetElement.matches(".card")) {
        // Access the data-movie-id attribute value
        const showId = targetElement.getAttribute("data-show-id");
        window.location.href = `details.html?showId=${showId}`;
      }
    }
  });
}
