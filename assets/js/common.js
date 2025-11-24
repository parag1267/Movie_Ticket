// Sidebar active color change Admin Panel
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Redirect cinemaRedirect
const cinemaRedirect = (blockId) => {
    sessionStorage.setItem("_redirectedCinemaId",JSON.stringify(blockId));
    window.location = "../user/cinema.html";
    event.preventDefault();
}

// Redirect cinemaRedirect null value
if (window.location.pathname != "/user/cinema.html"){
    sessionStorage.setItem("_redirectedCinemaId",JSON.stringify(null));
}

// Redirect recommendedMoviesList
const movieRedirect = (blockId) => {
    sessionStorage.setItem("_redirectedMovieId",JSON.stringify(blockId));
    window.location = "../user/movie.html";
    event.preventDefault();
}

// Redirect recommendedMoviesList
if(window.location.pathname != "/user/movie.html"){
    sessionStorage.setItem("_redirectedMovieId",JSON.stringify(null));
}