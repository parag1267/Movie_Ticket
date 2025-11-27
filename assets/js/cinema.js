let ls_cinemaData = JSON.parse(localStorage.getItem('cinema'));
console.log(ls_cinemaData);

let cinemaBlock = '';

ls_cinemaData.map((cinema,index) => {
    cinemaBlock +=
    `
        <div class="cinema-card">
            <a href="" onclick="cinemaDetailRedirect(${cinema.cid})" class="" id="block-${cinema.cid}">
                <img src=${cinema.image} alt="${cinema.cinemaName}">
                <div class="cinema-name">${cinema.cinemaName}</div>
            </a>
        </div>
    `
    document.getElementById("cinemaAlls").innerHTML = cinemaBlock;
    
})



