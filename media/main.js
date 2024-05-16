import { userUrl,genreUrl,moviesUrl,showsUrl } from "../constants.js";

let filteredArrOfMovies = [];
let filteredArrOfShows = [];
let loggedInUser = JSON.parse(window.localStorage.getItem("user"));


function getFilteredData(movies, searchValue, ratings, genre) {
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

function getFilteredShows(shows, searchValue, ratings, genre) {
  filteredArrOfShows =
    searchValue?.length > 0
      ? shows.filter((show) => show.name.toLowerCase().includes(searchValue))
      : shows;

  if (ratings > 0) {
    filteredArrOfShows = searchValue?.length > 0 ? filteredArrOfShows : shows;
    filteredArrOfShows = filteredArrOfShows.filter(
      (show) => show.rating.average >= ratings
    );
  }

  if (genre?.length > 0) {
    filteredArrOfShows =
      searchValue?.length > 0 || ratings > 0 ? filteredArrOfShows : shows;
    filteredArrOfShows = filteredArrOfShows.filter((show) =>
      show.genres.includes(genre)
    );
  }
  return filteredArrOfShows;
}

const getGenres = async (genreElement) => {
  fetch(genreUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i of data) {
        let optionELe = document.createElement("option");
        optionELe.classList.add("dropdown-item");
        optionELe.setAttribute("value", i.genre);
        optionELe.innerHTML = i.genre;
        genreElement.appendChild(optionELe);
      }
    });
};

const renderMovies = (page, movies) => {
  const movieList = movies.map((movie) => {
    return `<div class="card" data-movie-id="${movie.id}">
         <img src="${
           movie.img_link
         }" loading="lazy" class="card-img-top" alt="${movie.name}">
      <div class="card-body" id="${movie.id}">
          <h5 class="card-title"><strong>${movie.name}</strong></h5>
          <p class="card-text"><strong>Genre: </strong>${movie.genre}</p>
          <div class="ratings">
              <span class="material-symbols-outlined">
                  star
              </span>
              <span>${movie.imdb_rating}</span>
          </div>
          <p>${movie.duration} minutes <p>
          <button id="${page === "list" ? "removeBtn" : "addBtn"}" class="${
      page === "list" ? "btn btn-danger" : "btn btn-primary"
    }" data-movie-id="${movie.id}">
            ${page === "list" ? "Remove" : "Add to WatchList"}
        </button>
      </div>
  </div>`;
  });

  const innerMovieList = movieList.join("");
  return innerMovieList;
};

const renderShows = (page, shows) => {
  const showsList = shows.map((show) => {
    return `<div class="card" data-show-id="${show.id}">
      <img src="${show.image.original}"
          class="card-img-top" loading="lazy" alt="${show.name}">
      <div class="card-body" id="${show.id}">
          <h5 class="card-title"><strong>${show.name}</strong></h5>
          <p class="card-text"><strong>Genre: </strong>${show.genres}</p>
          <div class="ratings">
              <span class="material-symbols-outlined">
                  star
              </span>
              <span>${show.rating.average}</span>
          </div>
          <button id="${page === "list" ? "removeBtn" : "addBtn"}" class="${
      page === "list" ? "btn btn-danger" : "btn btn-primary"
    }" data-show-id="${show.id}">
            ${page === "list" ? "Remove" : "Add to WatchList"}
        </button>
      </div>
  </div>`;
  });

  const innerShowList = showsList.join("");
  return innerShowList;
};

const slideMovieContent = (movies) => {
  const slideWrapper = document.createElement("div");
  slideWrapper.classList.add("slide");

  const moviesList = movies.map((movie) => {
    const slide = document.createElement("div");
    slide.classList.add("slide-content");

    const slideCaption = document.createElement("div");
    slideCaption.classList.add("slide-caption");

    const title = document.createElement("h3");
    title.id = "carousel-1-slide-1-title";
    title.textContent = movie.name;

    const starSymbol = document.createElement("span");
    starSymbol.classList.add("material-symbols-outlined");
    starSymbol.textContent = "star";

    const rating = document.createElement("span");
    rating.textContent = movie.imdb_rating;

    slideCaption.appendChild(title);
    slideCaption.appendChild(starSymbol);
    slideCaption.appendChild(rating);

    const image = document.createElement("img");
    image.src = movie.img_link;
    image.alt = movie.name;
    image.width = 800;
    image.height = 350;

    slide.appendChild(slideCaption);
    slide.appendChild(image);

    slideWrapper.appendChild(slide);
  });

  return slideWrapper;
};

const slideShowContent = (shows) => {
  const showsList = shows.map((show) => {
    return `
    <div class="slide" role="tabpanel" aria-labelledby="carousel-1-slide-1-title">
        <div class="slide-content">
            <div class="slide-caption">
                <h3 id="carousel-1-slide-1-title">${movie.name}</h3>
                <span class="material-symbols-outlined">
                  star
              </span>
              <span>${movie.imdb_rating}</span>
            </div>

        <img src="${movie.img_link}" alt="${movie.name}"
                                        width="800" height="350" />
      </div>
     </div>
    `;
  });
  const innerShowsSlide = showsList.join("");
  return innerShowsSlide;
};


const addRemoveListFunction = async (type, event,movieId,showId) => {
  if (type === "movies") {
    if (event.target.id === "addBtn") {
      // Retrieve the movie ID associated with the clicked button
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
  } else if (type === "shows") {
    if (event.target.id === "addBtn") {
      // Retrieve the show ID associated with the clicked button
      const getShowsUrl = `${showsUrl}/${showId}`;
      const show = await axios.get(getShowsUrl);
      loggedInUser.shows.push(show.data);
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
          console.error("Could not add show", error);
        });
    } else {
      let targetElement = event.target;
      while (targetElement && !targetElement.matches(".card")) {
        targetElement = targetElement.parentElement;
      }

      // Check if we found a card element
      if (targetElement && targetElement.matches(".card")) {
        // Access the data-show-id attribute value
        const showId = targetElement.getAttribute("data-show-id");
        window.location.href = `details.html?showId=${showId}`;
      }
    }
  }
};


export {
  getFilteredData,
  getGenres,
  renderMovies,
  renderShows,
  getFilteredShows,
  slideShowContent,
  slideMovieContent,
  addRemoveListFunction
};
