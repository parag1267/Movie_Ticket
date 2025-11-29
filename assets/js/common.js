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

// Redirect cinemaDetailRedirect
const cinemaDetailRedirect = (blockId) => {
    localStorage.setItem("_redirectedCinemaDetailId",JSON.stringify(blockId));
    window.location = "../../user/cinema-details.html";
    event.preventDefault();
}

// Redirect cinemaDetailRedirect null value
// if(window.location.pathname != "../../user/cinema_details.html"){
//     localStorage.setItem("_redirectedCinemaDetailId",JSON.stringify(null));
// }

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


// Redirect recommendedMoviesDetailList 
const movieDetailRedirect = (blockId) => {
    localStorage.setItem("_redirectedMovieDetailId",JSON.stringify(blockId));
    window.location = "../../user/movie-details.html";
    event.preventDefault();
}

// Redirect recommendedMoviesDetailList
if(window.location.pathname != "/user/movie-details.html"){
    localStorage.setItem("_redirectedMovieDetailId",JSON.stringify(null));
}

// Redirect cinemaRedirect
const redirectBookTickect = (blockId) => {
    localStorage.setItem("_redirectedBookTicketId",JSON.stringify(blockId));
    window.location = "../user/book-ticket.html";
    event.preventDefault();
}

// Redirect cinemaRedirect null value
if (window.location.pathname != "/user/book-ticket.html"){
    localStorage.setItem("_redirectedBookTicketId",JSON.stringify("null"));
}