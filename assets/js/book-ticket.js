let ls_bookTicket = JSON.parse(localStorage.getItem("_redirectedBookTicketId"));
let ls_movieData = JSON.parse(localStorage.getItem("movie"));


let selectBook = ls_movieData.find((ele) => ele.mid == ls_bookTicket);

let allCinemas = [];
if (selectBook) {
    allCinemas = ls_movieData.filter(m => m.movieName === selectBook.movieName);
}

ls_MovieBlock = '';
if (selectBook) {
    ls_MovieBlock +=
        `
    <section class="container-fluid movie-title">
            <h2 class="p-3 fw-bold text-center bg-white">${selectBook.movieName}</h2>
        </section>

        <section class="container-fluid bg-muted">
            <div class="container my-4">
                <p class="fs-4"><span class="fw-bold fs-3">${selectBook.movieName} </span>is on screen at:</p>

                <div class="d-flex align-items-center justify-content-between border py-4 px-2">
                    <p class="mb-0">06 Jun, 2024</p>

                    <div class="d-flex flex-row gap-4">
                        <p class="mb-0 fs-6 available">● SEATS AVAILABLE</p>
                        <p class="mb-0 fs-6 notAvailable">● SEATS NOT AVAILABLE</p>
                    </div>
                </div>
        `;

    allCinemas.forEach(cinema => {
        let timeButtons = '';
        if (Array.isArray(cinema.selectTime)) {
            cinema.selectTime.forEach(time => {
                timeButtons +=
                    `<button class="btn btn-outline-dark btn-sm rounded-3 timeBtn"
                        data-cinema = "${cinema.selectCinema}"
                        data-time = "${time}"
                        data-movie = "${selectBook.movieName}"> ${time}</button>`
            });
        }


        ls_MovieBlock +=
            `
            <div class="border py-4 px-2" >
                <div class="d-flex flex-row justify-content-start gap-5">
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center gap-5">
                            <p class="mb-3 fs-6 fw-bold">${cinema.selectCinema}</p>
                            <p class="mb-3 fs-6"><i class="fa-solid fa-circle-info"></i> INFO</p>
                        </div>

                        <div class="d-flex justify-content-between align-items-center gap-5 gold">
                            <p class="mb-0 fs-6"><i class="fa-solid fa-mobile"></i> Mobile Ticket</p>
                            <p class="mb-0 fs-6"><i class="fa-solid fa-utensils"></i> Food & Beverage</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-center flex-wrap gap-4">
                        <p class="mb-0 fs-5">Time of shows:</p>
                        ${timeButtons}
                    </div>
                </div>
            </div>
        `;
    });

    ls_MovieBlock +=
        `
        </div >
        </section >
    `;
}

document.getElementById("ListBook").innerHTML = ls_MovieBlock;

let allTimeBtns = document.querySelectorAll(".timeBtn");
allTimeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let selectedCinema = this.getAttribute("data-cinema");
        let selectedTime = this.getAttribute("data-time");
        let selectedMovie = this.getAttribute("data-movie");

        let bookingData = {
            movieName: selectedMovie,
            cinemaName: selectedCinema,
            time: selectedTime,
        };

        localStorage.setItem("selectedBooking", JSON.stringify(bookingData));
        alert("Time Selected Successfully added");
        console.log('Saved Data : ', bookingData);

        window.location.href = "seat_design.html";
    })
})
