let ls_book = JSON.parse(localStorage.getItem("bookingTime"));
console.log(ls_book);

// let ls_show = JSON.parse(localStorage.getItem("seatData"));
// console.log(ls_show);

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
let selectedSeats = [];
let seatPrice = parseInt(ls_book.priceSeat);

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

function takingSeat(index){
    let btn = document.getElementsByClassName("seatBtn")[index];
    if(btn.classList.contains("available")){
        btn.classList.remove("available");
        btn.classList.add("selected");
        selectedSeats.push(index);
    }
    else if(btn.classList.contains("selected")) {
        btn.classList.remove("selected");
        btn.classList.add("available");
        selectedSeats = selectedSeats.filter(s => s !== index);
    }
    updatePrice();
}

function updatePrice(){
    document.getElementById("confirmBtn").innerHTML = 
    `₹ ${selectedSeats.length * ls_book.priceSeat} | ${selectedSeats.length} Seats`;
}

document.getElementById("confirmBtn").addEventListener("click", ()=>{
    selectedSeats.forEach(index => {
        ls_book.seatCinema[index] = 1;
        // ls_show.seatCinema[index] = 1;
    });

     ls_book.bookedSeat = selectedSeats.map(i => i + 1);

    localStorage.setItem("bookingTime",JSON.stringify(ls_book));
    localStorage.setItem("seatData",JSON.stringify(ls_show));
    selectedSeats.forEach(index => {
        let btn = document.getElementsByClassName("seatBtn")[index];
        btn.classList.remove("selected");
        btn.classList.add("booked");
        btn.setAttribute("disabled",true);
    });

    updatePrice()
    window.location.reload();
})
