// Sidebar active color change
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebarLinks.forEach(l => l.classList.remove('active')); 
        this.classList.add('active'); 
    });
});

let seatTasks = JSON.parse(localStorage.getItem("seatData")) ? JSON.parse(localStorage.getItem("seatData")) : [];

const addseat = () => {
    const selectCinema = document.getElementById("selectCinema").value;
    const selectMoive = document.getElementById("selectMoive").value;
    const selectCinemaTimeshow = document.getElementById("selectCinemaTimeshow").value;
    const seatCinema = document.getElementById("seatCinema").value.trim();
    const priceSeat = document.getElementById("priceSeat").value.trim();

    const selectCinemaError = document.getElementById("selectCinemaError");
    const selectMoiveError = document.getElementById("selectMoiveError");
    const selectCinemaTimeshowError = document.getElementById("selectCinemaTimeshowError");
    const seatError = document.getElementById("seatError");
    const priceSeatError = document.getElementById("priceSeatError");

    let isvalid = true;

    if(selectCinema === "" || selectCinema === "Select Cinema Name below"){
        selectCinemaError.textContent = "Please select cinema name";
        isvalid = false;
    }
    if(selectMoive === "" || selectMoive === "Select Movie Name below"){
        selectMoiveError.textContent = "Please select movie name";
        isvalid = false;
    }
    if(selectCinemaTimeshow === "" || selectCinemaTimeshow === "Select time shows below"){
        selectCinemaTimeshowError.textContent = "Please select time show";
        isvalid = false;
    }
    if(seatCinema === ""){
        seatError.textContent = "Please enter number seat";
        isvalid = false;
    }
    if(priceSeat === ""){
        priceSeatError.textContent = "Please enter price seat";
        isvalid = false;
    }

    if(!isvalid) return;

    let ls_cinema = JSON.parse(localStorage.getItem("cinema")) || [];
    let selectCinemaObj = ls_cinema.find(c => c.cinemaName === selectCinema);    

    let ls_movie = JSON.parse(localStorage.getItem("movie")) || [];
    let selectMovieObj = ls_movie.find(m => m.movieName === selectMoive);


    let seatObject = {
        sid : Math.floor(Math.random() * 1000),
        selectCinema : selectCinema,
        selectMoive : selectMoive,
        selectCinemaTimeshow : selectCinemaTimeshow,
        seatCinema : seatCinema,
        priceSeat : priceSeat,
        cid : selectCinemaObj ? selectCinemaObj.cid : "",
        mId : selectMovieObj ? selectMovieObj.mId : "",
    }

    seatTasks.push(seatObject);
    localStorage.setItem("seatData",JSON.stringify(seatTasks));

    const closemodal = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(closemodal);
    modal.hide();

    alert("Add Seat");

    selectCinema.textContent = "";
    selectMoive.textContent = "";
    selectCinemaTimeshow.textContent = "";
    seatCinema.textContent = "";
    priceSeat.textContent = "";

    seatView();
}

const handleRemove = (sid) => {
    if(!confirm("Are you sure you want to delete this record?")) return;
    seatTasks = seatTasks.filter(item => item.sid !== sid);
    localStorage.setItem("seatData",JSON.stringify(seatTasks));
    seatView();
}

const seatView = () => {
    let tableBody = document.getElementById("viewData");
    tableBody.innerHTML = "";
    let seatData = JSON.parse(localStorage.getItem("seatData")) || [];
    seatData.map((value,index) => {
        let tr = document.createElement("tr");
        tr.innerHTML= 
            `
                <td>${value.sid}</td>
                <td>${value.selectCinema}</td>
                <td>${value.selectMoive}</td>
                <td>${value.selectCinemaTimeshow}</td>
                <td>${value.seatCinema}</td>
                <td>${value.priceSeat}</td>
        `;
        let td = document.createElement("td");
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid","fa-trash");
        deleteButton.appendChild(deleteIcon);


        deleteButton.addEventListener("click",() => {
            handleRemove(value.sid)
        })

        let editButton = document.createElement("button");
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid","fa-pen-to-square");
        editButton.appendChild(editIcon);

        td.appendChild(deleteButton);
        td.appendChild(editButton);

        tr.appendChild(td);

        tableBody.appendChild(tr);
    });
};
seatView();




function cinemaDropdown() {
    let cinemaData = JSON.parse(localStorage.getItem("cinema")) || [];
    let dropDown = document.getElementById("selectCinema");
    dropDown.innerHTML =
        `
            <option value="" selected>Select Cinema Name Below</option>
        `;

    cinemaData.forEach((cinema) => {
        let option = document.createElement("option");
        option.value = cinema.cinemaName;
        option.textContent = cinema.cinemaName;
        dropDown.appendChild(option);
    });
}
cinemaDropdown();

document.getElementById("selectCinema").addEventListener("change", function () {
    let selectedCinema = this.value;
    if (selectedCinema !== "") {
        localStorage.setItem("selectedCinema",selectedCinema);
    }
});


function movieDropdown() {
    let cinemaData = JSON.parse(localStorage.getItem("movie")) || [];
    let dropDown = document.getElementById("selectMoive");
    dropDown.innerHTML =
        `
            <option value="" selected>Select Movie Name Below</option>
        `;

    cinemaData.forEach((movie) => {
        let option = document.createElement("option");
        option.value = movie.movieName;
        option.textContent = movie.movieName;
        dropDown.appendChild(option);
    });
}
movieDropdown();

document.getElementById("selectMoive").addEventListener("change", function () {
    let selectedMovie = this.value;
    if (selectedMovie !== "") {
        localStorage.setItem("selectedMovie",selectedMovie);
    }
});

function timeShowDropdown() {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];
    let selectedMovie = localStorage.getItem("selectedMovie");

    let dropDown = document.getElementById("selectCinemaTimeshow");
    dropDown.innerHTML = `<option value="" selected>Select Cinema Time Show Below</option>`;

    // Find selected movie
    let movie = movieData.find(m => m.movieName === selectedMovie);

    if (!movie || !movie.selectTime) return;

    movie.selectTime.forEach(time => {
        let option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        dropDown.appendChild(option);
    });
}

timeShowDropdown();

document.getElementById("selectCinema").addEventListener("change", function () {
    localStorage.setItem("selectedCinema", this.value);
    timeShowDropdown();
});




