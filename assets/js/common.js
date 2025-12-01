// Sidebar active color change Admin Panel
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Redirect cinemaDetailRedirect
const cinemaDetailRedirect = (blockId) => {
    localStorage.setItem("_redirectedCinemaDetailId",JSON.stringify(blockId));
    window.location = "../../user/cinema-details.html";
    event.preventDefault();
}

// Redirect recommendedMoviesDetailList 
const movieDetailRedirect = (blockId) => {
    localStorage.setItem("_redirectedMovieDetailId",JSON.stringify(blockId));
    window.location = "../../user/movie-details.html";
    event.preventDefault();
}


// Redirect cinemaRedirect
const redirectBookTickect = (blockId) => {
    localStorage.setItem("_redirectedBookTicketId",JSON.stringify(blockId));
    window.location = "../user/book-ticket.html";
    event.preventDefault();
}

