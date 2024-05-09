const moviesUrl = "http://localhost:8000/movies";
const genreUrl = "http://localhost:8000/genres";
let main = document.getElementById("main");
let searchElement = document.getElementById("search");
let movieRating = document.getElementById("rating");
let movieGenre = document.getElementById("genre");
let loginElement = document.getElementById("login");
let searchValue = "";
let filteredArrOfMovies = [];
let ratings = 0;
let genre = ""; //empty string means faulty value
let genres = [];

const loggedInUser = window.localStorage.getItem("user");

if (loggedInUser !== null) {
  let logOut = document.createElement("button");
  logOut.classList.add("btn", "btn-danger");
  logOut.innerText = "Log Out";
  logOut.setAttribute("type", "button");
  loginElement.innerHTML = "";
  loginElement.appendChild(logOut);
} else {
  let loginButton = document.createElement("button");
  loginButton.innerText = "Log In";
  loginButton.classList.add("btn", "btn-light");
  loginButton.setAttribute("type", "button");
  let signUpButton = document.createElement("button");
  signUpButton.innerText = "Sign Up";
  signUpButton.setAttribute("type", "button");
  signUpButton.classList.add("btn", "btn-success");
  loginElement.innerHTML = "";
  loginElement.appendChild(signUpButton);
  loginElement.appendChild(loginButton);
}

const getMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getGenres = async () => {
  fetch(genreUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i of data) {
        console.log(i);
        let optionELe = document.createElement("option");
        optionELe.classList.add("dropdown-item");
        optionELe.setAttribute("value", i.genre);
        optionELe.innerHTML = i.genre;
        movieGenre.appendChild(optionELe);
      }
    });
};

const renderMovies = (movies) => {
  const movieList = movies.map((movie) => {
    return `<div class="card" ">
    <img src="${movie.img_link}"
        class="card-img-top" alt="${movie.name}">
    <div class="card-body">
        <h5 class="card-title">${movie.name}</h5>
        <p class="card-text">Genre : ${movie.genre}</p>
        <div class="ratings">
            <span class="material-symbols-outlined">
                star
            </span>
            <span>${movie.imdb_rating}</span>
        </div>
        <p>${movie.duration} minutes <p>
        <button class="btn btn-primary">Add to WatchList</button>
    </div>
</div>`;
  });

  const innerMovieList = movieList.join("");
  return innerMovieList;
};

let movies = await getMovies();
genres = await getGenres();

main.innerHTML = renderMovies(movies);

function filterByRating() {
  return filteredArrOfMovies;
}

function filterByGenre() {
  return filteredArrOfMovies;
}

function getFilteredData() {
  filteredArrOfMovies =
    searchValue?.length > 0
      ? movies.filter(
          (movie) =>
            movie.name.toLowerCase().includes(searchValue) ||
            movie.director_name.toLowerCase().includes(searchValue) ||
            movie.writter_name.toLowerCase().split(",").includes(searchValue) ||
            movie.cast_name.toLowerCase().split(",").includes(searchValue)
        )
      : movies;

  if (ratings > 0) {
    filteredArrOfMovies =
      searchValue?.length > 0 ? filteredArrOfMovies : movies;
    filteredArrOfMovies = filteredArrOfMovies.filter(
      (movie) => movie.imdb_rating >= ratings
    );
  }

  if (genre?.length > 0) {
    filteredArrOfMovies =
      searchValue?.length > 0 || ratings > 0 ? filteredArrOfMovies : movies;
    filteredArrOfMovies = filteredArrOfMovies.filter((movie) =>
      movie.genre.toLowerCase().split(",").includes(genre.toLowerCase())
    );
  }
  return filteredArrOfMovies;
}

function handleSearch(event) {
  searchValue = event.target.value.toLowerCase();
  main.innerHTML = renderMovies(getFilteredData());
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

searchElement.addEventListener(
  "keyup",
  handleSearchDebounce(handleSearch, 500)
);

function handleRatingFilter(event) {
  ratings = event.target.value;
  main.innerHTML = "";
  main.innerHTML = renderMovies(getFilteredData());
}

function handleGenreChange(event) {
  genre = event.target.value;
  main.innerHTML = "";
  main.innerHTML = renderMovies(getFilteredData());
}

movieRating.addEventListener("change", handleRatingFilter);
movieGenre.addEventListener("change", handleGenreChange);
