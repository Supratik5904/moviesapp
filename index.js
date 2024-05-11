import { getGenres, renderMovies, getFilteredData } from "./main.js";

const moviesUrl = "http://localhost:8000/movies";
const userUrl = "http://localhost:8000/users/";
let main = document.getElementById("main");
let searchElement = document.getElementById("search");
let movieRating = document.getElementById("rating");
let movieGenre = document.getElementById("genre");
let loginElement = document.getElementById("login");
let listElements = document.getElementById("list-elements");
let searchValue = "";
let ratings = 0;
let genre = ""; //empty string means faulty value

let loggedInUser = JSON.parse(window.localStorage.getItem("user"));

if (loggedInUser !== null) {
  let logOut = document.createElement("button");
  logOut.classList.add("btn", "btn-danger");
  logOut.innerText = "Log Out";
  logOut.setAttribute("type", "button");
  loginElement.innerHTML = "";
  loginElement.appendChild(logOut);
  logOut.addEventListener("click", handleLogOut);
  let myList = document.createElement("li");
  myList.classList.add("nav-item");
  let watchListLink = document.createElement("a");
  watchListLink.classList.add("nav-link");
  watchListLink.setAttribute("href", "watchlist.html");
  watchListLink.innerText = "My List";
  myList.appendChild(watchListLink);
  listElements.appendChild(myList);
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
  signUpButton.addEventListener("click", handleSignup);
  loginButton.addEventListener("click", handleLogin);
}

function handleLogOut(event) {
  window.localStorage.removeItem("user");
  window.location.href = "/user/login.html";
}
function handleLogin(event) {
  window.location.href = "/user/login.html";
}

function handleSignup(event) {
  window.location.href = "/user/signup.html";
}

const getMovies = async () => {
  try {
    const { data } = await axios.get(moviesUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};

let movies = await getMovies();
await getGenres(movieGenre);

main.innerHTML = renderMovies("home", movies);

main.addEventListener("click", async (event) => {
  if (event.target.id === "addBtn") {
    // Retrieve the movie ID associated with the clicked button
    const movieId = event.target.getAttribute("data-movie-id");
    const getMovieURL = `${moviesUrl}/${movieId}`;
    const movie = await axios.get(getMovieURL);
    loggedInUser.movies.push(movie.data);
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
        alert(`Added to watch list`);
      })
      .catch((error) => {
        console.error("Could not add movie", error);
      });
  }
});

searchElement.addEventListener(
  "keyup",
  handleSearchDebounce(handleSearch, 500)
);

function handleGenreChange(event) {
  genre = event.target.value;
  main.innerHTML = "";
  main.innerHTML = renderMovies(
    "home",
    getFilteredData(movies, searchValue, ratings, genre)
  );
}

function handleSearch(event) {
  searchValue = event.target.value.toLowerCase();
  main.innerHTML = renderMovies(
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
  main.innerHTML = "";
  main.innerHTML = renderMovies(
    "home",
    getFilteredData(movies, searchValue, ratings, genre)
  );
}

movieRating.addEventListener("change", handleRatingFilter);
movieGenre.addEventListener("change", handleGenreChange);
