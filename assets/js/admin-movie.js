// Sidebar active color change
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        sidebarLinks.forEach(l => l.classList.remove('active')); 
        this.classList.add('active'); 
    });
});



let moiveTask = JSON.parse(localStorage.getItem("movie")) ? JSON.parse(localStorage.getItem("movie")) : [];

const addMovie = () => {
    const movieName = document.getElementById("movieName").value.trim();
    const decription = document.getElementById("decription").value.trim();
    const selectCinema = document.getElementById("selectCinema").value;
    const image = document.getElementById("movieImage");
    // const selectTime = document.getElementById("selectTime").value.trim();
    // Collect ALL Time Inputs
    const selectTime = [...document.querySelectorAll(".timeRow input")]
        .map(t => t.value)
        .filter(t => t !== "");



    const moiveNameError = document.getElementById("moiveNameError");
    const decriptionError = document.getElementById("decriptionError");
    const selectCinemaError = document.getElementById("selectCinemaError");
    const movieImageError = document.getElementById("movieImageError");
    const selectTimeError = document.getElementById("selectTimeError");

    moiveNameError.textContent = "";
    decriptionError.textContent = "";
    selectCinemaError.textContent = "";
    movieImageError.textContent = "";
    selectTimeError.textContent = "";

    let isvalid = true;
    if (movieName === "") {
        moiveNameError.textContent = "Please enter movie name";
        isvalid = false;
    }
    if (decription === "") {
        decriptionError.textContent = "Please enter movie decription";
        isvalid = false;
    }
    if (selectCinema === "") {
        selectCinemaError.textContent = "Please select cinema name";
        isvalid = false;
    }
    if (image.files.length === 0) {
        movieImageError.textContent = "Please select movie image";
        isvalid = false;
    }
    if (selectTime.length === 0) {
        selectTimeError.textContent = "Please select movie time";
        isvalid = false;
    }

    if (!isvalid) return;

    const imagePath = "../assets/images/" + image.files[0].name;

    let ls_cinemaId = JSON.parse(localStorage.getItem("cinema")) || [];

    let selectedCinemaObj = ls_cinemaId.find(c => c.cinemaName === selectCinema);


    let objec = {
        mId: Math.floor(Math.random() * 1000),
        movieName,
        decription,
        selectCinema,
        image: imagePath,
        selectTime,
        cid : selectedCinemaObj ? selectedCinemaObj.cid : "",
    }

    moiveTask.push(objec);
    localStorage.setItem("movie", JSON.stringify(moiveTask));

    const closemodal = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(closemodal);
    modal.hide();
    
    alert("Add movie");


    movieName.textContent = "";
    decription.textContent = "";
    selectCinema.textContent = "";
    image.textContent = "";
    selectTime.textContent = "";


    viewData();
}

const handleRemove = (mId) => {
    if(!confirm("Are you sure you want to delete this record?")) return;
    moiveTask = moiveTask.filter(item => item.mId !== mId);
    localStorage.setItem("movie",JSON.stringify(moiveTask));
}

const viewData = () => {
    let tableBody = document.getElementById("viewData");
    tableBody.innerHTML = "";
    let allRecord = JSON.parse(localStorage.getItem("movie")) || [];
    allRecord.map((value, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML=
            `
                <td>${value.mId}</td>
                <td>${value.movieName}</td>
                <td>${value.decription}</td>
                <td>${value.selectCinema}</td>
                <td>
                    <ul>
                        ${value.selectTime.map(t => `<li>${t}</li>`).join("")}
                    </ul>
                </td>

                <td><img src="${value.image}" class="admin-image"></td>
        `;
        let td = document.createElement("td");
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid","fa-trash");
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener("click",() => {
            handleRemove(value.mId)
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
viewData();


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
// This is the fix
// document.addEventListener("DOMContentLoaded", cinemaDropdown);
cinemaDropdown();



document.getElementById("selectCinema").addEventListener("change", function () {
    let selectedCinema = this.value;
    if (selectedCinema !== "") {
        localStorage.setItem("selectedCinema",selectedCinema);
    }
});

// Select Time
let timeRowId = JSON.parse(localStorage.getItem("_timeRowId")) || [];

if (timeRowId.length === 0) {
    addNewRow();
} else {
    timeRowId.forEach(id => {
        createRow(id);
    });
}

// Create Time Row Function
function createRow(id) {
    let div = document.createElement("div");
    div.classList.add("form-floating", "mb-3", "timeRow");
    div.id = "row-" + id;

    let input = document.createElement("input");
    input.type = "time";
    input.classList.add("form-control", "rounded-4");

    let label = document.createElement("label");
    label.textContent = "Select Time";

    let btnDiv = document.createElement("div");
    btnDiv.classList.add("btn_align");

    let plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.onclick = addNewRow;

    let minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "-";
    minus.onclick = () => removeRow(id);

    btnDiv.appendChild(plus);
    btnDiv.appendChild(minus);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(btnDiv);

    document.getElementById("dyTimeRow").appendChild(div);
}


// Add New Row
function addNewRow() {
    let id = Math.floor(Math.random() * 1000);
    timeRowId.push(id);
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));

    createRow(id);
}


// Remove Row
function removeRow(id) {
    document.getElementById(id)?.remove();

    timeRowId = timeRowId.filter(x => x !== id);
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));
}

function addNewRow() {
    // timeRowId = [];
    let randomNumber = Math.floor(Math.random() * 1000);
    timeRowId.push(randomNumber);
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));

    let div = document.createElement("div");
    div.classList.add("form-floating", "mb-3", "timeRow");
    div.setAttribute("id", randomNumber);

    let input = document.createElement("input");
    input.type = "time";
    input.classList.add("form-control", "rounded-4");
    input.placeholder = "Select Time";

    let label = document.createElement("label");
    label.textContent = "Select Time";

    let divButton = document.createElement("div");
    divButton.classList.add("btn_align");

    let plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.textContent = "+";
    plusButton.onclick = addNewRow;

    let minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.textContent = "-";
    minusButton.onclick = function () { removeRow(randomNumber); };

    divButton.appendChild(plusButton);
    divButton.appendChild(minusButton);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(divButton);

    document.getElementById("dyTimeRow").appendChild(div);
}

function removeRow(randomNumber) {
    let row = document.getElementById(randomNumber);
    if (row) {
        row.remove();
    }

    let storeId = JSON.parse(localStorage.getItem("_timeRowId")) || [];
    storeId = storeId.filter(id => id !== randomNumber);
    localStorage.setItem("_timeRowId", JSON.stringify(storeId));
    timeRowId = storeId;
}