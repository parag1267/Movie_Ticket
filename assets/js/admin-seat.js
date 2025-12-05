let seatTasks = JSON.parse(localStorage.getItem("seatData")) ? JSON.parse(localStorage.getItem("seatData")) : [];
let editId = null;

const addseat = () => {
    const selectCinema = document.getElementById("selectCinema").value;
    const selectMoive = document.getElementById("selectMoive").value;
    const selectCinemaTimeshow = document.getElementById("selectCinemaTimeshow").value;
    const seatCinema = document.getElementById("seatCinema").value.trim();
    const priceSeat = document.getElementById("priceSeat").value.trim();

    let seat_array = [];
    const total_seats = parseInt(seatCinema);
    for (let i = 1; i <= total_seats; i++) {
        seat_array.push(0);
    }

    const selectCinemaError = document.getElementById("selectCinemaError");
    const selectMoiveError = document.getElementById("selectMoiveError");
    const selectCinemaTimeshowError = document.getElementById("selectCinemaTimeshowError");
    const seatError = document.getElementById("seatError");
    const priceSeatError = document.getElementById("priceSeatError");

    let isvalid = true;

    if (selectCinema === "" || selectCinema === "Select Cinema Name below") {
        selectCinemaError.textContent = "Please select cinema name";
        isvalid = false;
    }
    if (selectMoive === "" || selectMoive === "Select Movie Name below") {
        selectMoiveError.textContent = "Please select movie name";
        isvalid = false;
    }
    if (selectCinemaTimeshow === "" || selectCinemaTimeshow === "Select time shows below") {
        selectCinemaTimeshowError.textContent = "Please select time show";
        isvalid = false;
    }
    if (seatCinema === "") {
        seatError.textContent = "Please enter number seat";
        isvalid = false;
    }
    if (priceSeat === "") {
        priceSeatError.textContent = "Please enter price seat";
        isvalid = false;
    }

    if (!isvalid) return;

    let ls_cinema = JSON.parse(localStorage.getItem("cinema")) || [];
    let selectCinemaObj = ls_cinema.find(c => c.cinemaName === selectCinema);

    let ls_movie = JSON.parse(localStorage.getItem("movie")) || [];
    let selectMovieObj = ls_movie.find(m => m.movieName === selectMoive);

    if (editId == null) {
        let seatObject = {
            sid: Math.floor(Math.random() * 1000),
            selectCinema: selectCinema,
            selectMoive: selectMoive,
            selectCinemaTimeshow: selectCinemaTimeshow,
            seatCinema: seat_array,
            priceSeat: priceSeat,
            cid: selectCinemaObj ? selectCinemaObj.cid : "",
            mid: selectMovieObj ? selectMovieObj.mid : "",
        }

        seatTasks.push(seatObject);
    }

    else {
        let index = seatTasks.findIndex(item => item.sid === editId);
        seatTasks[index] = {
            sid : editId,
            seatCinema : seat_array,
            priceSeat : priceSeat,
        }

        if (index !== -1) {
            seatTasks[index].selectCinema = selectCinema;
            seatTasks[index].selectMoive = selectMoive;
            seatTasks[index].selectCinemaTimeshow = selectCinemaTimeshow;
            seatTasks[index].cid = selectCinemaObj ? selectCinemaObj.cid : "";
            seatTasks[index].mid = selectMovieObj ? selectMovieObj.mid : "";
        }
        editId = null;
    }


    localStorage.setItem("seatData", JSON.stringify(seatTasks));

    const closemodal = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(closemodal);
    modal.hide();

    alert("Add Seat");

    selectCinema.value = "";
    selectMoive.value = "";
    selectCinemaTimeshow.value = "";
    seatCinema.value = "";
    priceSeat.value = "";

    seatView();
}

const handleRemove = (sid) => {
    seatTasks = seatTasks.filter(item => item.sid !== sid);
    localStorage.setItem("seatData", JSON.stringify(seatTasks));
    seatView();
}

const updateData = (sid) => {
    let editData = seatTasks.find(item => item.sid === sid);
    editId = sid;

    document.getElementById("selectCinema").value = editData.selectCinema;
    document.getElementById("selectMoive").value = editData.selectMoive;
    document.getElementById("selectCinemaTimeshow").value = editData.selectCinemaTimeshow;
    document.getElementById("seatCinema").value = editData.seatCinema.length;
    document.getElementById("priceSeat").value = editData.priceSeat;

    // Open modal
    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    myModal.show();

    document.getElementById("saveBtn").textContent = "Update Cinema";
}

const seatView = () => {
    let tableBody = document.getElementById("viewData");
    tableBody.innerHTML = "";
    let seatData = JSON.parse(localStorage.getItem("seatData")) || [];
    seatData.map((value, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML =
            `
                <td>${value.sid}</td>
                <td>${value.selectCinema}</td>
                <td>${value.selectMoive}</td>
                <td>${value.selectCinemaTimeshow}</td>
                <td>${value.seatCinema.length}</td>
                <td>${value.priceSeat}</td>
        `;
        let td = document.createElement("td");
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteButton.appendChild(deleteIcon);


        deleteButton.addEventListener("click", () => {
            handleRemove(value.sid)
        })

        let editButton = document.createElement("button");
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen-to-square");
        editButton.appendChild(editIcon);

        editButton.addEventListener("click", () => {
            updateData(value.sid);
        })

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
        dropDown.addEventListener("change", function () {
            let selectedCinema = this.value;
            localStorage.setItem("selectedCinema", selectedCinema);
            movieDropdown(selectedCinema);
            timeShowDropdown();
        });
    });
}

function movieDropdown(selectCinema = "") {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];
    let dropDown = document.getElementById("selectMoive");
    dropDown.innerHTML =
        `
            <option value="" selected>Select Movie Name Below</option>
        `;
    let filteredMovies = movieData.filter(m => selectCinema === "" || m.selectCinema === selectCinema);

    filteredMovies.forEach((movie) => {
        let option = document.createElement("option");
        option.value = movie.movieName;
        option.textContent = movie.movieName;
        dropDown.appendChild(option);
    });


    dropDown.addEventListener("change", function () {
        localStorage.setItem("selectedMovie", this.value);
        timeShowDropdown();
    });
}


function timeShowDropdown() {
    let movieData = JSON.parse(localStorage.getItem("movie")) || [];
    let selectCinema = localStorage.getItem("selectedCinema")
    let selectedMovie = localStorage.getItem("selectedMovie");

    let dropDown = document.getElementById("selectCinemaTimeshow");
    dropDown.innerHTML = `<option value="" selected>Select Cinema Time Show Below</option>`;

    // Find selected movie
    let movie = movieData.find(m => m.selectCinema === selectCinema && m.movieName === selectedMovie);

    if (!movie || !movie.selectTime) return;

    movie.selectTime.forEach(time => {
        let option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        dropDown.appendChild(option);
    });
}

cinemaDropdown();
movieDropdown();
timeShowDropdown();







