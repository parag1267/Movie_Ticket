let ls_cinema = JSON.parse(localStorage.getItem("cinema")) || [];
console.log(ls_cinema);

let ls_selectedCinemaIndex = JSON.parse(localStorage.getItem("_redirectedCinemaDetailId"));
console.log(ls_selectedCinemaIndex);


let selectedCinema = ls_cinema[ls_selectedCinemaIndex];

if(selectedCinema) {
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