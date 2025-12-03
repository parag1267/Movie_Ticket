let ls_book = JSON.parse(localStorage.getItem("bookingTime"));
console.log(ls_book);

let seatBlock = '';
if(ls_book) {
    seatBlock = 
    `
        <div class="d-flex justify-content-between align-items-center px-2 movie-First">
                <a href="../user/book-ticket.html"><i class="fa-solid fa-less-than text-dark"></i></a>
                <h2 class="p-3 m-0 fw-bold text-center">${ls_book.selectMoive}</h2>
                <p class="m-0">The show at <b>${ls_book.selectCinema}</b> on <b>${ls_book.selectCinemaTimeshow}</b> O'Clock</p>
        </div>

        <div class="container">
                <div class="pt-4 seatPrice">
                    <p>₹ ${ls_book.priceSeat} / Seat</p>
                </div>

                <div class="d-flex align-items-center flex-wrap gap-3 seatInfo" id="seatBox">
                </div>
        </div>   
    `
}

document.getElementById("showInfo").innerHTML = seatBlock;

let seatContainer = document.getElementById("seatBox");

ls_book.seatCinema.forEach((value,index) => {
    seatContainer.innerHTML += 
        `
            <button type="button"
                class="seatBtn ${value == 1 ? "booked" : "available"}"
                onclick="takingSeat(${index})"
                ${value == 1 ? "disabled" : ""}
            >
                ${index + 1}
            </button>
        `;
});
