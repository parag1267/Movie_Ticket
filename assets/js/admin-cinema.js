let cinemaTasks = JSON.parse(localStorage.getItem("cinema")) ? JSON.parse(localStorage.getItem("cinema")) : [];
let editId = null;

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

    if (!isvalid) return;

    let imagePath = '';

    if (editId === null) {
        if (image.files.length === 0) {
            cinemaImageError.textContent = "Please select Cinema image";
            return;
        }

        imagePath = "../assets/images/" + image.files[0].name;

        let cinemaObjec = {
            cid: Math.floor(Math.random() * 1000),
            cinemaName,
            location,
            facilities,
            image: imagePath,
        }

        cinemaTasks.push(cinemaObjec);
    }
    else {
        let index = cinemaTasks.findIndex(item => item.cid === editId);
        if (image.files.length === 0) {
            imagePath = cinemaTasks[index].image;
        }
        else {
            imagePath = "../assets/images/" + image.files[0].name;
        }

        cinemaTasks[index] = {
            cid : editId,
            cinemaName,
            location,
            facilities,
            image : imagePath,
        };

        editId = null;
    }

    localStorage.setItem("cinema", JSON.stringify(cinemaTasks));

    const closemodal = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(closemodal);
    modal.hide();

    alert("Add Successfully");

    document.getElementById("cinemaName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("facilities").value = "";
    document.getElementById("movieImage").src = "";
    viewData();
}


const handleRemove = (cid) => {
    cinemaTasks = cinemaTasks.filter(item => item.cid !== cid);
    localStorage.setItem("cinema", JSON.stringify(cinemaTasks));
    viewData();
}

const updateData = (cid) => {
    let editData = cinemaTasks.find(item => item.cid === cid);
    editId = cid;

    document.getElementById("cinemaName").value = editData.cinemaName;
    document.getElementById("location").value = editData.location;
    document.getElementById("facilities").value = editData.facilities;


    // Open modal
    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    myModal.show();

    document.getElementById("saveBtn").textContent = "Update Cinema";
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

        editButton.addEventListener("click", () => {
            updateData(value.cid)
        })

        td.appendChild(deleteButton);
        td.appendChild(editButton);

        tr.appendChild(td);

        tableBody.appendChild(tr);
    });

};
viewData();