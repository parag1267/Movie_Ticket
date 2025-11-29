let ls_movieData = JSON.parse(localStorage.getItem("movie")) || [];
console.log(ls_movieData);

let blockMovie = '';

ls_movieData.map((movie,index) => {
    blockMovie +=
    `
        <div class="movie-card">
            <a href="" onclick="movieDetailRedirect(${movie.mId})" class="" id="block-${movie.mId}">
                <img src=${movie.image} alt="${movie.movieName}">
                <h4>${movie.movieName}</h4>
            </a>
        </div>
    `
})
document.getElementById("movieAlls").innerHTML = blockMovie;