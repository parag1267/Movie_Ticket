// Swiper Slider
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 40,
    centeredSlides: true,
    autoplay: {
        delay: 2600,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// cinemaList 
let ls_cinemaData = JSON.parse(localStorage.getItem("cinema"));
let cinemaBlock = '';
ls_cinemaData.map((cinema, index) => {
    if (index < 5) {
        cinemaBlock +=
            `
                <div class="cinemaItem">
                    <a href="" onclick="cinemaDetailRedirect(${cinema.cid})" class="" id="block-${cinema.cid}">
                        <img src="${cinema.image}" alt="${cinema.cinemaName}" class="cinemaImage">
                        <h4>${cinema.cinemaName}</h4>
                    </a>
                </div>
            `
        document.getElementById("cinemaList").innerHTML = cinemaBlock;
    }
})

// movieList 
let ls_movieData = JSON.parse(localStorage.getItem("movie"));
let movieBlock = '';
ls_movieData.map((movie, index) => {
    if (index < 6) {
        movieBlock +=
            `
                <div class="recommendedMoviesItem">
                    <a href="" onclick="movieDetailRedirect(${movie.mid})" class="" id="block-${movie.mid}">
                        <img src="${movie.image}" alt="${movie.movieName}"
                        class="recommendedMoviesImage">
                        <h4>${movie.movieName}</h4>
                    </a>
                </div>
            `
        document.getElementById("recommendedMoviesList").innerHTML = movieBlock;
    }
})