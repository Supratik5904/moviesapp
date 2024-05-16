import { getGenres, renderMovies, getFilteredData ,addRemoveListFunction} from "./main.js";
import { createSidebar } from "../sidebar.js";
import { moviesUrl } from "../constants";


let movieContainer = document.getElementById("movieContainer");
let searchElement = document.getElementById("search");
let movieRating = document.getElementById("rating");
let movieGenre = document.getElementById("genre");
let parentContainer = document.getElementById("content");
let searchValue = "";
let ratings = 0;
let genre = ""; //empty string means faulty value

window.onload = function () {
  // Get the container where you want to load the sidebar
  // Load the sidebar content into the container
  parentContainer.appendChild(createSidebar());
  const hamBurger = document.querySelector(".toggle-btn");

  hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
    document.getElementById("movieContent").classList.toggle("shift_navbar");
  });
};
const getMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl);
    document.getElementById("spinner").style.display = "none";
    movieContainer.innerHTML = renderMovies("home", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

let movies = await getMovies();
await getGenres(movieGenre);

movieContainer.addEventListener("click", async (event) => {
  const movieId = event.target.getAttribute("data-movie-id");
  await addRemoveListFunction("movies",event,movieId,null);
});

searchElement.addEventListener(
  "keyup",
  handleSearchDebounce(handleSearch, 500)
);

function handleGenreChange(event) {
  genre = event.target.value;
  movieContainer.innerHTML = "";
  movieContainer.innerHTML = renderMovies(
    "home",
    getFilteredData(movies, searchValue, ratings, genre)
  );
}

function handleSearch(event) {
  searchValue = event.target.value.toLowerCase();
  movieContainer.innerHTML = renderMovies(
    "home",
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
  movieContainer.innerHTML = "";
  movieContainer.innerHTML = renderMovies(
    "home",
    getFilteredData(movies, searchValue, ratings, genre)
  );
}

movieRating.addEventListener("change", handleRatingFilter);
movieGenre.addEventListener("change", handleGenreChange);
