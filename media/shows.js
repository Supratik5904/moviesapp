import { renderShows, getFilteredShows, getGenres,addRemoveListFunction } from "./main.js";
import { createSidebar } from "../sidebar.js";
import { userUrl,genreUrl,moviesUrl,showsUrl } from "../constants.js";


let parentContainer = document.getElementById("content");
let showsContainer = document.getElementById("showsContainer");
let searchElement = document.getElementById("search");
let showRating = document.getElementById("rating");
let showGenre = document.getElementById("genre");

let searchValue = "";
let ratings = 0;
let genre = "";

window.onload = function () {
  // Get the container where you want to load the sidebar
  // Load the sidebar content into the container
  parentContainer.appendChild(createSidebar());
  const hamBurger = document.querySelector(".toggle-btn");

  hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
    document.getElementById("showContent").classList.toggle("shift_navbar");
  });
};
let loggedInUser = JSON.parse(window.localStorage.getItem("user"));

const getShows = async () => {
  try {
    const { data } = await axios.get(showsUrl);
    document.getElementById("spinner").style.display = "none";
    showsContainer.innerHTML = renderShows("home", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

let shows = await getShows();
await getGenres(showGenre);

showsContainer.addEventListener("click", async (event) => {
  const showId = event.target.getAttribute("data-show-id");
  await addRemoveListFunction("shows",event,null,showId);
});

searchElement.addEventListener(
  "keyup",
  handleSearchDebounce(handleSearch, 500)
);

function handleSearch(event) {
  searchValue = event.target.value.toLowerCase();
  showsContainer.innerHTML = renderShows(
    "home",
    getFilteredShows(shows, searchValue, ratings, genre)
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
  showsContainer.innerHTML = "";
  showsContainer.innerHTML = renderShows(
    "home",
    getFilteredShows(shows, searchValue, ratings, genre)
  );
}

function handleGenreChange(event) {
  genre = event.target.value;
  showsContainer.innerHTML = "";
  showsContainer.innerHTML = renderShows(
    "home",
    getFilteredShows(shows, searchValue, ratings, genre)
  );
}

showRating.addEventListener("change", handleRatingFilter);
showGenre.addEventListener("change", handleGenreChange);
