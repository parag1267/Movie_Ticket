let ls_movie = JSON.parse(localStorage.getItem("movie")) || [];
console.log(ls_movie);

let ls_selectedMovieIndex = JSON.parse(localStorage.getItem("_redirectedMovieDetailId"));
console.log(ls_selectedMovieIndex);


let selectedMovie = ls_movie.find((ele) => ele.mId == ls_selectedMovieIndex);
console.log(selectedMovie);

if (selectedMovie) {
    document.getElementById("MovieDetailsList").innerHTML =
    `
    <div class="d-flex flex-column flex-md-row gap-4 ">
        <div class="movie-image">
                <img src=${selectedMovie.image} alt=${selectedMovie.movieName} class="img-fluid rounded-3">
        </div>
        
        <div class="movie-info">
            <div class="mb-2">
                <h2 class="fw-semibold text-start mt-2">${selectedMovie.movieName}</h2>
                <p class="text-dark">Action • Crime • Adventure</p>
                <span class="badge bg-light text-dark border me-1">2D</span>
                <span class="badge bg-light text-dark border me-1">3D</span>
                <span class="badge bg-light text-dark border me-1">ICE 3D</span>
                <span class="badge bg-light text-dark border me-1">4DX 2D</span>
            </div>

            <div class="mb-2">
                <span class="badge bg-light text-dark border">Hindi, Gujarati, Malayalam, Marathi, Telugu,
                                Kannada, Punjabi</span>
            </div>

            <p class="mb-2">2h 30m • 1 Jan, 2024</p>

            <button class="btn rounded-3 bookBtn" onclick="redirectBookTickect(${selectedMovie.mId})">Book Tickets</button>
        </div>
    </div>

        <div class="d-flex flex-column my-4">
            <h5 class="fw-bold fs-4">About ${selectedMovie.movieName}:</h5>
            <p class="">who are coerced into converting to lslam,and go on to join the lslamic state of lrad and syria(lsls).</p>
        </div>
    
    `;
}

let movieBlock = '';
ls_movie.map((movie,index) => {
    movieBlock +=
    `
        <div class="movie-card">
            <img src=${movie.image} alt=${movie.movieName}>
            <h4>${movie.movieName}</h4>
        </div>
    `;
})
document.getElementById("AllMovies").innerHTML = movieBlock;


