let ls_seat = JSON.parse(localStorage.getItem("seatData"));
console.log(ls_seat);

let ls_seatBook = JSON.parse(localStorage.getItem("selectedBooking"));
console.log(ls_seatBook);


let seatBlock = '';
if(ls_seatBook) {
    seatBlock = 
    `
        <div class="d-flex justify-content-between align-items-center px-2 movie-First">
                <a href="../user/book-ticket.html"><i class="fa-solid fa-less-than text-dark"></i></a>
                <h2 class="p-3 m-0 fw-bold text-center">${ls_seatBook.movieName}</h2>
                <p class="m-0">The show at <b>${ls_seatBook.cinemaName}</b> on <b>${ls_seatBook.time}</b> O'Clock</p>
        </div>
    
    `

    seatBlock = 
    `
        <div class="container">
                <div class="pt-4 seatPrice">
                    <p>₹ Price / Seat</p>
                </div>

                <div class="d-flex align-items-center flex-wrap gap-3 seatInfo">
                    <button type="button" id="seat" onclick="takingSeat()">1</button>
                </div>
        </div>
    
    `
}

document.getElementById("showInfo").innerHTML = seatBlock;
