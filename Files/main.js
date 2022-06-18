const BASE_URL ="http://localhost:3000/api/pg-data";


async function getPgDataFromServer() {

        fetch (BASE_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayPlaygrounds(data);

        })
}


function displayPlaygrounds(pgData) {
    //pgData.awaitPromise;
    //const pString = pgData;
    console.log("... displaying response");
    let pTest = document.querySelector("main p");
    console.log(pgData);

    let pgList = document.querySelector("main ul");
    pgData.forEach (pg => {
        let pgLi = document.createElement("li");
        pgLi.textContent = pg.name + " " + pg.lat;
        pgList.append(pgLi);
    });


}