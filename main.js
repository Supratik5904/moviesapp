const genreUrl = "http://localhost:8000/genres";
let filteredArrOfMovies = [];

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
    return `<div class="card">
      <img src="${movie.img_link}"
          class="card-img-top" alt="${movie.name}">
      <div class="card-body" id="${movie.id}">
          <h5 class="card-title">${movie.name}</h5>
          <p class="card-text">Genre : ${movie.genre}</p>
          <div class="ratings">
              <span class="material-symbols-outlined">
                  star
              </span>
              <span>${movie.imdb_rating}</span>
          </div>
          <p>${movie.duration} minutes <p>
          <button id="addBtn" class="${
            page === "home" ? "btn btn-primary" : "btn btn-danger"
          }" data-movie-id="${movie.id}">${
      page === "home" ? "Add to WatchList" : "Remove"
    }</button>
      </div>
  </div>`;
  });

  const innerMovieList = movieList.join("");
  return innerMovieList;
};

export { getFilteredData, getGenres, renderMovies };
