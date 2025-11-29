let ls_cinema = JSON.parse(localStorage.getItem("cinema")) || [];

let ls_selectedCinemaIndex = JSON.parse(localStorage.getItem("_redirectedCinemaDetailId"));

let selectedCinema = ls_cinema.find((ele) => ele.cid == ls_selectedCinemaIndex);


if (selectedCinema) {
    document.getElementById("cinemDetailList").innerHTML =
        `
            <div class="know-cinemaImage">
                <img src=${selectedCinema.image} alt=${selectedCinema.cinemaName}>
            </div>

            <div class="know-cinemaInfo">
                <h2 class="fs-2 fw-bold mb-2">${selectedCinema.cinemaName}</h2>
                <p class="fs-6 mb-2"><i class="fa-solid fa-location-dot"></i> ${selectedCinema.location}</p>
                <p class="fs-6 mb-2"><i class="fa-solid fa-building"></i> ${selectedCinema.facilities}</p>
                <button class="mt-2 border-0 text-white py-2 px-3 rounded-3 fs-6">Know more..</button>
            </div>
        `;
}

function filterMoviesByCinema(cineamId) {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];
    return movieData.filter(m => m.cid == cineamId);
}

let filterMovies = filterMoviesByCinema(selectedCinema.cid);
let filterMovie = "";


filterMovie +=
`
    <div class="screenTitle" id="screenTitle">
        <h4 class="fw-bold fs-4 my-4">On Screen movies at <span class="fw-bold fs-3">${selectedCinema.cinemaName}</span></h4>
    </div>
    <div class="d-flex align-items-center onScreen-cinemaImage">
`;

filterMovies.forEach(movie => {
    filterMovie +=
        `<div class="imgBox">
            <img src=${movie.image} alt=${movie.movieName} class="img-fluid rounded-3">    
            <h4>${movie.movieName}</h4>
            </div>
        `;
});

filterMovie += `</div>`;

document.getElementById("selectedMovie").innerHTML = filterMovie;
