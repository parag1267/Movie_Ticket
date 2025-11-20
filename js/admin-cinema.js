let cinemaTasks = JSON.parse(localStorage.getItem("cinema")) ? JSON.parse(localStorage.getItem("cinema")) : [];

const addTask = () => {
    const cinemaName = document.getElementById("cinemaName").value.trim();
    const location = document.getElementById("location").value.trim();
    const facilities = document.getElementById("facilities").value.trim();
    const image = document.getElementById("movieImage");

    const cinemaNameError = document.getElementById("cinemaNameError");
    const locationError = document.getElementById("locationError");
    const facilitiesError = document.getElementById("facilitiesError");
    const cinemaImageError = document.getElementById("cinemaImageError");

    cinemaNameError.textContent = "";
    locationError.textContent = "";
    facilitiesError.textContent = "";
    cinemaImageError.textContent = "";

    let isvalid = true;

    if (cinemaName === "") {
        cinemaNameError.textContent = "Please enter Cinema name";
        isvalid = false;
    }
    if (location === "") {
        locationError.textContent = "Please enter Cinema location";
        isvalid = false;
    }
    if (facilities === "") {
        facilitiesError.textContent = "Please enter Cinema facilities";
        isvalid = false;
    }
    if (image.files.length === 0) {
        cinemaImageError.textContent = "Please select Cinema image";
        isvalid = false;
    }

    if (!isvalid) return;

    const imagePath = "../assets/images/" + image.files[0].name;

    let cinemaObjec = {
        cid: Math.floor(Math.random() * 1000),
        cinemaName,
        location,
        facilities,
        image: imagePath,
    }

    cinemaTasks.push(cinemaObjec);
    localStorage.setItem("cinema", JSON.stringify(cinemaTasks));

    const closemodal = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(closemodal);
    modal.hide();

    alert("Add Successfully");

    cinemaName.textContent = "";
    location.textContent = "";
    facilities.textContent = "";
    image.textContent = "";

    viewData();
}


const handleRemove = (cid) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    cinemaTasks = cinemaTasks.filter(item => item.cid !== cid);

    localStorage.setItem("cinema", JSON.stringify(cinemaTasks));

    viewData();
}



const viewData = () => {
    const tableBody = document.getElementById("viewData");
    tableBody.innerHTML = "";
    let allRecord = JSON.parse(localStorage.getItem("cinema")) || [];
    allRecord.map((value, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML =
            `
                <td>${value.cid}</td>
                <td>${value.cinemaName}</td>
                <td>${value.location}</td>
                <td>${value.facilities}</td>
                <td><img src="${value.image}" class="admin-image"></td>
        `;

        let td = document.createElement("td");
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener("click", () => {
            handleRemove(value.cid)
        })

        let editButton = document.createElement("button");
        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen-to-square");
        editButton.appendChild(editIcon);

        td.appendChild(deleteButton);
        td.appendChild(editButton);

        tr.appendChild(td);

        tableBody.appendChild(tr);
    });

};
viewData();