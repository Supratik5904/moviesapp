import { createSidebar } from "./sidebar.js";
import { moviesUrl,showsUrl } from "./constants.js";
import { renderMovies, renderShows,addRemoveListFunction } from "./media/main.js";
let sideBarContainer = document.getElementById("container");
let carousel = document.getElementById("carousels");


let movieContainer = document.getElementById("movies");
let showContainer = document.getElementById("shows")


window.onload = function () {
  // Get the container where you want to load the sidebar
  // Load the sidebar content into the container
  sideBarContainer.appendChild(createSidebar());
  const hamBurger = document.querySelector(".toggle-btn");

  hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
    document.getElementById("main").classList.toggle("shift");
  });
};


movieContainer.addEventListener("click", async (event) => {
  const movieId = event.target.getAttribute("data-movie-id");
  await addRemoveListFunction("movies",event,movieId,null);
});

showContainer.addEventListener("click", async (event) => {
  const showId = event.target.getAttribute("data-show-id");
  await addRemoveListFunction("shows",event,null,showId);
});

// Call handleButtonClick when needed

function handleButtonClick(movies, shows) {
  document.getElementById("movies").innerHTML = renderMovies("index", movies);
  document.getElementById("shows").innerHTML = renderShows("index", shows);
}

document
  .getElementById("button-group")
  .addEventListener("click", async (event) => {
    if (carousel) {
      carousel.remove();
    }
    document.getElementById("slideContainer").style.display = "block";
    if (event.target.id == "topRatedBtn") {
      const movieRes = await axios.get(`${moviesUrl}?imdb_rating_gte=9`);
      let movies = movieRes.data;
      const showRes = await axios.get(`${showsUrl}?rating.average_gte=8.9`);
      let shows = showRes.data;
      handleButtonClick(movies, shows);
    }
    if (event.target.id == "mostViewedBtn") {
      const movieRes = await axios.get(`${moviesUrl}?_start=0&_end=10`);
      let movies = movieRes.data;
      const showRes = await axios.get(`${showsUrl}?_start=0&_end=10`);
      let shows = showRes.data;
      handleButtonClick(movies, shows);
    }
  });
