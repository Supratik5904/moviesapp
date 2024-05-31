import { createSidebar } from "../sidebar.js";
import {moviesUrl,showsUrl } from "../constants.js";


const queryParams = new URLSearchParams(window.location.search);

let movieId = null;
let showId = null;

showId = queryParams.get("showId");
movieId = queryParams.get("movieId");

let parentContainer = document.getElementById("parent-container");
let centreContainer = document.getElementById("centre");

window.onload = function () {
  // Get the container where you want to load the sidebar
  // Load the sidebar content into the container
  parentContainer.appendChild(createSidebar());
  const hamBurger = document.querySelector(".toggle-btn");

  hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
  });
};

async function createShowDetails(showId) {
  try {
    const { data } = await axios.get(`${showsUrl}/${showId}`);
    const heading = document.createElement("h1");
    heading.textContent = data.name;
    centreContainer.appendChild(heading);

    // Create show image
    const showImage = document.createElement("div");
    showImage.classList.add("show-image");
    const image = document.createElement("img");
    image.src = data.image.medium;
    image.alt = data.name;
    showImage.appendChild(image);
    centreContainer.appendChild(showImage);

    // Create summary
    const summary = document.createElement("div");
    summary.classList.add("summary");
    summary.innerHTML = data.summary;
    centreContainer.appendChild(summary);

    // Create genres
    const genres = document.createElement("div");
    genres.classList.add("genres");
    data.genres.forEach((genre) => {
      const span = document.createElement("span");
      span.textContent = genre;
      genres.appendChild(span);
    });
    centreContainer.appendChild(genres);

    // Create details
    const details = document.createElement("div");
    details.classList.add("details");
    const detailItems = [
      `Language: ${data.language}`,
      `Premiered: ${data.premiered}`,
      `Ended: ${data.ended}`,
      `Runtime: ${data.runtime} minutes`,
      `Rating: ${data.rating.average}/10`,
      `Network: ${data.network.name} (${data.network.country.name})`,
      `Schedule: ${data.schedule.days[0]}s at ${data.schedule.time} (${data.network.country.timezone})`,
    ];
    detailItems.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item;
      details.appendChild(p);
    });
    centreContainer.appendChild(details);

    // Create links
    const links = document.createElement("div");
    links.classList.add("links");
    const infoLink = document.createElement("a");
    infoLink.textContent = "Official Site";
    infoLink.href = data.url;
    const imdbLink = document.createElement("a");
    imdbLink.textContent = "IMDb";
    imdbLink.href = `https://www.imdb.com/title/${data.externals.imdb}/`;
    links.appendChild(document.createTextNode("More info: "));
    links.appendChild(infoLink);
    links.appendChild(document.createTextNode(" | "));
    links.appendChild(imdbLink);
    centreContainer.appendChild(links);
  } catch (error) {
    console.log(error);
  }
}

async function createMovieDetails(movieId) {
  try {
    const { data } = await axios.get(`${moviesUrl}/${movieId}`);
    const heading = document.createElement("h1");
    heading.textContent = data.name;
    centreContainer.appendChild(heading);

    // Create show image
    const movieImage = document.createElement("div");
    movieImage.classList.add("movie-image");
    const image = document.createElement("img");
    image.src = data.img_link;
    image.alt = data.name;
    image.classList.add("mv-img");
    movieImage.appendChild(image);
    centreContainer.appendChild(movieImage);

    // Create summary
    const summary = document.createElement("div");
    summary.classList.add("summary");
    summary.innerHTML = data.description;
    centreContainer.appendChild(summary);

    // Create genres
    const genres = document.createElement("div");
    genres.classList.add("genres");
    data.genre.split(",").forEach((genre) => {
      const span = document.createElement("span");
      span.textContent = genre;
      genres.appendChild(span);
    });
    centreContainer.appendChild(genres);

    // Create details
    const details = document.createElement("div");
    details.classList.add("details");
    const detailItems = [
      `Votes: ${data.imbd_votes}`,
      `Premiered: ${data.year}`,
      `Runtime: ${data.duration} minutes`,
      `Rating: ${data.imdb_rating}/10`,
      `Director: ${data.director_name}`,
      `Cast: ${data.cast_name}`,
    ];
    detailItems.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item;
      details.appendChild(p);
    });
    centreContainer.appendChild(details);

    // Create links
    const links = document.createElement("div");
    links.classList.add("links");
    const infoLink = document.createElement("a");
    infoLink.textContent = "Official Site";
    infoLink.href = data.url;
    const imdbLink = document.createElement("a");
    imdbLink.textContent = "IMDb";
    imdbLink.href = `https://www.imdb.com/title/${data.id}/`;
    links.appendChild(document.createTextNode("More info: "));
    links.appendChild(infoLink);
    links.appendChild(document.createTextNode(" | "));
    links.appendChild(imdbLink);
    centreContainer.appendChild(links);
  } catch (error) {
    console.log(error);
  }
}

if (movieId !== null) {
  createMovieDetails(movieId);
} else {
  createShowDetails(showId);
}
